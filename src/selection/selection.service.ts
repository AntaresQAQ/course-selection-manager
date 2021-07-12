import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { SelectionEntity } from './selection.entity';
import { StudentEntity } from '@/student/student.entity';
import { CourseEntity } from '@/course/course.entity';

@Injectable()
export class SelectionService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(SelectionEntity)
    private readonly selectionRepository: Repository<SelectionEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async addSelection(
    name: string,
    students: StudentEntity[],
  ): Promise<SelectionEntity> {
    const selection = this.selectionRepository.create();
    selection.name = name;
    selection.students = students;
    selection.course = [];
    await this.selectionRepository.save(selection);
    return selection;
  }

  async removeSelection(id: number): Promise<void> {
    await this.connection.transaction(
      'READ COMMITTED',
      async (entityManager) => {
        const selection: SelectionEntity = await entityManager.findOne(
          SelectionEntity,
          id,
          { relations: ['students'] },
        );
        if (selection) {
          // await entityManager.delete(CourseEntity, { selection });
          await entityManager.remove(selection);
        }
      },
    );
  }
}
