import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { AdminService } from './admin.service';
import { ConfigService } from '@/config/config.service';

import {
  AllowRegisterResponseDto,
  AllowRegisterResponseError,
} from './dto/allow-register-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import {
  RegisterResponseDto,
  RegisterResponseError,
} from './dto/register-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto, LoginResponseError } from './dto/login-response.dto';
import { ResetRequestDto } from './dto/reset-request.dto';
import { ResetResponseDto, ResetResponseError } from './dto/reset-response.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}

  @Get('allowRegister')
  async allowRegister(
    @Session() session: Record<string, any>,
  ): Promise<AllowRegisterResponseDto> {
    if (session.uid || session.type) {
      return {
        error: AllowRegisterResponseError.ALREADY_LOGGED,
      };
    }
    return {
      allow: this.configService.config.environment.allowRegister,
    };
  }

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() request: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    if (session.uid || session.type) {
      return {
        error: LoginResponseError.ALREADY_LOGGED,
      };
    }
    const admin = await this.adminService.findAdminByUsername(request.username);
    if (!admin) {
      return {
        error: LoginResponseError.ERROR_USERNAME,
      };
    }
    if (!(await this.adminService.checkPassword(admin, request.password))) {
      return {
        error: LoginResponseError.ERROR_PASSWORD,
      };
    }
    session.uid = admin.id;
    session.type = 'admin';
    return {
      sessionInfo: {
        type: session.type,
        info: {
          id: admin.id,
          username: admin.username,
        },
      },
    };
  }

  @Post('register')
  async register(
    @Session() session: Record<string, any>,
    @Body() request: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    if (!this.configService.config.environment.allowRegister) {
      return {
        error: RegisterResponseError.NOT_ALLOW_REGISTER,
      };
    }
    if (session.uid || session.type) {
      return {
        error: RegisterResponseError.ALREADY_LOGGED,
      };
    }
    const { username, password } = request;
    if (!(await this.adminService.checkUsernameAvailability(username))) {
      return {
        error: RegisterResponseError.USERNAME_ALREADY_USED,
      };
    }
    const admin = await this.adminService.register(username, password);
    session.type = 'admin';
    session.uid = admin.id;
    return {
      sessionInfo: {
        type: session.type,
        info: {
          id: admin.id,
          username: admin.username,
        },
      },
    };
  }

  @Post('reset')
  async reset(
    @Session() session: Record<string, any>,
    @Body() request: ResetRequestDto,
  ): Promise<ResetResponseDto> {
    if (!session.uid || !session.type) {
      return {
        error: ResetResponseError.NOT_LOGGED,
      };
    }
    if (session.type !== 'admin') {
      return {
        error: ResetResponseError.PERMISSION_DENIED,
      };
    }
    const admin = await this.adminService.findAdminById(session.uid);
    if (await this.adminService.checkPassword(admin, request.currentPassword)) {
      await this.adminService.changePassword(admin, request.newPassword);
      return {
        result: 'SUCCEED',
      };
    } else {
      return {
        error: ResetResponseError.ERROR_PASSWORD,
      };
    }
  }
}
