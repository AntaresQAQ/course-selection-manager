import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { SelectionEntity } from './selection.entity';
import { StudentEntity } from '@/student/student.entity';

@Injectable()
export class SelectionService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(SelectionEntity)
    private readonly selectionRepository: Repository<SelectionEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async addSelection(
    name: string,
    students: StudentEntity[],
  ): Promise<SelectionEntity> {
    const selection = this.selectionRepository.create();
    selection.name = name;
    selection.students = students;
    await this.selectionRepository.save(selection);
    return selection;
  }
}
