import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CourseEntity } from './course.entity';
import { SelectionEntity } from '@/selection/selection.entity';
import { StudentEntity } from '@/student/student.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(SelectionEntity)
    private readonly selectionRepository: Repository<SelectionEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async addCourse(
    name: string,
    teacher: string,
    studentLimit: number,
    selection: SelectionEntity,
  ): Promise<CourseEntity> {
    const course = this.courseRepository.create();
    course.name = name;
    course.teacher = teacher;
    course.currentStudent = 0;
    course.studentsLimit = studentLimit;
    course.selection = selection;
    return await this.courseRepository.save(course);
  }

  async removeCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  async selectCourse(studentId: number, courseIds: number[]): Promise<void> {
    await this.connection.transaction(
      'READ COMMITTED',
      async (entityManager) => {
        const student = await entityManager.findOne(StudentEntity, studentId, {
          relations: ['courses'],
        });
        for (const courseId of courseIds) {
          const course = await entityManager.findOne(CourseEntity, courseId);
          if (course.currentStudent === course.studentsLimit) {
            throw new Error(
              `Can not select course ${course.id} "${course.name}"`,
            );
          }
          course.currentStudent++;
          await entityManager.save(course);
          student.courses.push(course);
        }
        await entityManager.save(student);
      },
    );
  }
}
