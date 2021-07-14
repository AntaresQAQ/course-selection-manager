import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { ConfigService } from '@/config/config.service';

import {
  AdminAllowRegisterResponseDto,
  AdminAllowRegisterResponseError,
  AdminLoginRequestDto,
  AdminLoginResponseDto,
  AdminLoginResponseError,
  AdminRegisterRequestDto,
  AdminRegisterResponseDto,
  AdminRegisterResponseError,
  AdminResetRequestDto,
  AdminResetResponseDto,
  AdminResetResponseError,
} from './dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'A request to check if the server allow register',
  })
  @Get('allowRegister')
  async allowRegister(
    @Session() session: Record<string, any>,
  ): Promise<AdminAllowRegisterResponseDto> {
    if (session.uid || session.type) {
      return { error: AdminAllowRegisterResponseError.ALREADY_LOGGED };
    }
    return { allow: this.configService.config.environment.allowRegister };
  }

  @ApiOperation({
    summary: 'A request to login a admin account',
  })
  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() request: AdminLoginRequestDto,
  ): Promise<AdminLoginResponseDto> {
    if (session.uid || session.type) {
      return { error: AdminLoginResponseError.ALREADY_LOGGED };
    }
    const admin = await this.adminService.findAdminByUsername(request.username);
    if (!admin) {
      return { error: AdminLoginResponseError.ERROR_USERNAME };
    }
    if (!(await this.adminService.checkPassword(admin, request.password))) {
      return { error: AdminLoginResponseError.ERROR_PASSWORD };
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

  @ApiOperation({
    summary: 'A request to register new admin account',
  })
  @Post('register')
  async register(
    @Session() session: Record<string, any>,
    @Body() request: AdminRegisterRequestDto,
  ): Promise<AdminRegisterResponseDto> {
    if (!this.configService.config.environment.allowRegister) {
      return { error: AdminRegisterResponseError.NOT_ALLOW_REGISTER };
    }
    if (session.uid || session.type) {
      return { error: AdminRegisterResponseError.ALREADY_LOGGED };
    }
    const { username, password } = request;
    if (!(await this.adminService.checkUsernameAvailability(username))) {
      return { error: AdminRegisterResponseError.USERNAME_ALREADY_USED };
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

  @ApiOperation({
    summary: 'A request to reset password for an admin account',
  })
  @Post('reset')
  async reset(
    @Session() session: Record<string, any>,
    @Body() request: AdminResetRequestDto,
  ): Promise<AdminResetResponseDto> {
    if (!session.uid || !session.type) {
      return { error: AdminResetResponseError.NOT_LOGGED };
    }
    if (session.type !== 'admin') {
      return { error: AdminResetResponseError.PERMISSION_DENIED };
    }
    const admin = await this.adminService.findAdminById(session.uid);
    if (await this.adminService.checkPassword(admin, request.currentPassword)) {
      await this.adminService.changePassword(admin, request.newPassword);
      return { result: 'SUCCEED' };
    } else {
      return { error: AdminResetResponseError.ERROR_PASSWORD };
    }
  }
}
