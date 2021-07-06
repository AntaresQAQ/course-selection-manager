import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { AdminService } from '@/admin/admin.service';
import { ConfigService } from '@/config/config.service';

import {
  AllowRegisterResponseDto,
  AllowRegisterResponseError,
} from './dto/allow-register-response.dto';
import {
  RegisterResponseDto,
  RegisterResponseError,
} from './dto/register-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

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
    if (session.sid || session.type) {
      return {
        error: AllowRegisterResponseError.ALREADY_LOGGED,
      };
    }
    return {
      allow: this.configService.config.environment.allowRegister,
    };
  }

  @Post('login')
  async login() {}

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
    if (session.sid || session.type) {
      return {
        error: RegisterResponseError.ALREADY_LOGGED,
      };
    }
    return await this.adminService.register(request.username,request.password);
  }

  @Post('reset')
  async reset() {}
}
