import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { StudentEntity } from '@/student/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async findStudentById(id: number): Promise<StudentEntity> {
    return await this.studentRepository.findOne(id);
  }
}
