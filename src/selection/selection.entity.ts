import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from '@/student/student.entity';
import { CourseEntity } from '@/course/course.entity';

@Entity()
export class SelectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => StudentEntity, (student) => student.selections)
  students: StudentEntity[];

  @OneToMany(() => CourseEntity, (course) => course.selection)
  courses: CourseEntity[];
}
