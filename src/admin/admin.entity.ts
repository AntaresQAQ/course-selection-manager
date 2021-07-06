import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 24 })
  @Index({ unique: true })
  username: string;

  @Column({ type: 'char', length: 60 })
  password: string;
}
