import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { StudentEntity } from './student.entity';
import { StudentRegisterInfoDto } from './dto';

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

  async findStudentById(
    id: number,
    loadRelation = false,
  ): Promise<StudentEntity> {
    return await this.studentRepository.findOne(id, {
      relations: loadRelation ? ['selections', 'courses'] : [],
    });
  }

  async findStudentsByIds(
    ids: number[],
    loadRelation = false,
  ): Promise<StudentEntity[]> {
    return await this.studentRepository.findByIds(ids, {
      relations: loadRelation ? ['selections', 'courses'] : [],
    });
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
          entity.courses = [];
          entity.selections = [];
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

  async changePassword(
    student: StudentEntity,
    password: string,
  ): Promise<void> {
    student.password = await StudentService.hashPassword(password);
    await this.studentRepository.save(student);
  }
}
