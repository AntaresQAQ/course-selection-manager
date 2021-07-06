import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AdminEntity } from '@/admin/admin.entity';
import { AdminInfo } from '@/admin/dto/admin-info.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async getAdminInfo(id: number): Promise<AdminInfo> {
    const info = await this.adminRepository.findOne(id);
    if (!info) return null;
    return {
      id: info.id,
      username: info.username,
    };
  }
}
