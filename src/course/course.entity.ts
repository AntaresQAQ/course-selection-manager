import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from '@/student/student.entity';
import { SelectionEntity } from '@/selection/selection.entity';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  teacher: string;

  @Column({ type: 'integer' })
  student_limit: number;

  @ManyToOne(() => SelectionEntity, (selection) => selection.courses)
  selection: SelectionEntity;

  @ManyToMany(() => StudentEntity, (student) => student)
  students: StudentEntity[];
}
