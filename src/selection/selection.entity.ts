import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from '@/student/student.entity';
import { CourseEntity } from '@/course/course.entity';

@Entity('selection')
export class SelectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => StudentEntity, (student) => student.selections)
  students: Promise<StudentEntity[]>;

  @OneToMany(() => CourseEntity, (course) => course.selection)
  courses: Promise<CourseEntity[]>;
}
