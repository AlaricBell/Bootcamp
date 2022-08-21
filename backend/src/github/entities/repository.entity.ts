import { Column, Entity, ManyToOne, PrimaryColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Contribution } from './contribution.entity';

@Entity('repository')
export class Repository {
  @PrimaryColumn()
  @ManyToMany(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
  })
  id: number;

  @Column({ type: 'int4' })
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  owner: number;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  html_url: string;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  @Column({ type: 'int4' })
  stargazers_count: number;

  @ManyToMany(() => User, (user) => user.repositories, {
    onDelete: 'SET NULL',
  })
  users: User[];
}
