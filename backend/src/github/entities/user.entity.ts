import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Repository } from './repository.entity';

@Entity('user')
export class User {
  @PrimaryColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  avatar_url: string;

  @Column({ type: 'varchar', length: 255 })
  html_url: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @ManyToMany(() => Repository, (repository) => repository.users, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  repositories: Repository[];
}
