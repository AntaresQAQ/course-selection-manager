import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from '@/student/student.entity';
import { CourseEntity } from '@/course/course.entity';

@Entity('selection')
export class SelectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @Index({ unique: false })
  name: string;

  @ManyToMany(() => StudentEntity, (student) => student.selections)
  students: StudentEntity[];

  @OneToMany(() => CourseEntity, (course) => course.selection)
  courses: CourseEntity[];
}
