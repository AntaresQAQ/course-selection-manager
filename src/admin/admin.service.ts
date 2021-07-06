import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { AdminEntity } from './admin.entity';

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

  async checkPassword(admin: AdminEntity, password: string): Promise<boolean> {
    return await bcrypt.compare(password, admin.password);
  }

  async findAdminById(id: number): Promise<AdminEntity> {
    return await this.adminRepository.findOne(id);
  }

  async findAdminByUsername(username: string): Promise<AdminEntity> {
    return await this.adminRepository.findOne({ username });
  }

  async register(username: string, password: string): Promise<AdminEntity> {
    const admin = this.adminRepository.create();
    admin.username = username;
    admin.password = await AdminService.hashPassword(password);
    await this.adminRepository.save(admin);
    return admin;
  }
}
