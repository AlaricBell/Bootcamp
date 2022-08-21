import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Repository } from './repository.entity';

@Entity('contribution')
export class Contribution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  user: User;

  @ManyToMany(() => Repository, (repository) => repository.id, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  repository: Repository;

  @Column({ type: 'int4' })
  commit_count: number;
}
