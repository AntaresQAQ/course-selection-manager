import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { StudentEntity } from './student.entity';
import { StudentRegisterInfoDto } from './dto/student-add-students-request.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async checkPassword(
    student: StudentEntity,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, student.password);
  }

  async findStudentById(id: number): Promise<StudentEntity> {
    return await this.studentRepository.findOne(id);
  }

  async findStudentsByIds(ids: number[]): Promise<StudentEntity[]> {
    return await this.studentRepository.findByIds(ids);
  }

  async registerStudents(
    students: StudentRegisterInfoDto[],
  ): Promise<StudentEntity[]> {
    const studentsEntity: StudentEntity[] = [];
    await this.connection.transaction(
      'READ COMMITTED',
      async (entityManager) => {
        for (const student of students) {
          const entity = new StudentEntity();
          entity.id = student.id;
          entity.name = student.name;
          entity.major = student.major;
          entity.password = await StudentService.hashPassword(student.password);
          await entityManager.save(entity);
          studentsEntity.push(entity);
        }
      },
    );
    return studentsEntity;
  }

  async deleteStudents(ids: number[]): Promise<void> {
    await this.studentRepository.delete(ids);
  }
}
