import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { AdminEntity } from './admin.entity';
import { AdminInfo } from './dto/admin-info.dto';
import {
  RegisterResponseDto,
  RegisterResponseError,
} from './dto/register-response.dto';
import { isUsername } from '@/common/validators';

@Injectable()
export class AdminService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async checkUsernameAvailability(username: string): Promise<boolean> {
    return (await this.adminRepository.count({ username })) === 0;
  }

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async getAdminInfo(id: number): Promise<AdminInfo | null> {
    const info = await this.adminRepository.findOne(id);
    if (!info) return null;
    return {
      id: info.id,
      username: info.username,
    };
  }

  async register(
    username: string,
    password: string,
  ): Promise<RegisterResponseDto> {
    if (!(await this.checkUsernameAvailability(username))) {
      return {
        error: RegisterResponseError.USERNAME_ALREADY_USED,
      };
    }
    const admin = this.adminRepository.create();
    admin.username = username;
    admin.password = await AdminService.hashPassword(password);
    await this.adminRepository.save(admin);
    return {
      info: {
        id: admin.id,
        username: admin.username,
      },
    };
  }
}
