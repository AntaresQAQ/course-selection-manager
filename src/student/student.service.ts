import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { StudentEntity } from '@/student/student.entity';
import { StudentInfo } from '@/student/dto/student-info.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudentInfo(id: number): Promise<StudentInfo> {
    const info = await this.studentRepository.findOne(id);
    if (!info) return null;
    return {
      id: info.id,
      name: info.name,
    };
  }
}
