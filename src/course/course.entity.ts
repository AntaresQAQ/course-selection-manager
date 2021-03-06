import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from '@/student/student.entity';
import { SelectionEntity } from '@/selection/selection.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @Index({ unique: false })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  teacher: string;

  @Column({ type: 'integer' })
  studentsLimit: number;

  @Column({ type: 'integer', default: 0 })
  currentStudent: number;

  @ManyToOne(() => SelectionEntity, (selection) => selection.courses)
  selection: SelectionEntity;

  @ManyToMany(() => StudentEntity, (student) => student.courses, {
    cascade: true,
  })
  students: StudentEntity[];
}
