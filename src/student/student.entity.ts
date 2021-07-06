import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { CourseEntity } from '@/course/course.entity';
import { SelectionEntity } from '@/selection/selection.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'char', length: 60 })
  password: string;

  @ManyToMany(() => SelectionEntity, (selection) => selection.students)
  @JoinTable()
  selections: SelectionEntity[];

  @ManyToMany(() => CourseEntity, (course) => course.students)
  @JoinTable()
  courses: CourseEntity[];
}
