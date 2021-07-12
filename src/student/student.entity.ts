import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { CourseEntity } from '@/course/course.entity';
import { SelectionEntity } from '@/selection/selection.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'char', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  @Index({ unique: false })
  major: string;

  @ManyToMany(() => SelectionEntity, (selection) => selection.students, {
    cascade: true,
  })
  @JoinTable()
  selections: SelectionEntity[];

  @ManyToMany(() => CourseEntity, (course) => course.students, {
    cascade: true,
  })
  @JoinTable()
  courses: CourseEntity[];
}
