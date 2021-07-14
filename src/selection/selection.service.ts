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

  async findSelectionById(
    id: number,
    loadRelations = false,
  ): Promise<SelectionEntity> {
    return await this.selectionRepository.findOne(id, {
      relations: loadRelations ? ['students', 'courses'] : [],
    });
  }

  async addSelection(
    name: string,
    students: StudentEntity[],
  ): Promise<SelectionEntity> {
    const selection = this.selectionRepository.create();
    selection.name = name;
    selection.students = students;
    selection.courses = [];
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

  async addStudents(
    selection: SelectionEntity,
    students: StudentEntity[],
  ): Promise<SelectionEntity> {
    selection.students.push(...students);
    await this.selectionRepository.save(selection);
    return await this.findSelectionById(selection.id, true);
  }

  async removeStudents(
    selection: SelectionEntity,
    studentIds: number[],
  ): Promise<void> {
    selection.students = selection.students.filter(
      (student: StudentEntity) => !studentIds.includes(student.id),
    );
    await this.selectionRepository.save(selection);
  }
}
