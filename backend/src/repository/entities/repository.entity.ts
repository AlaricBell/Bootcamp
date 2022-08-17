import { Column, Entity, ManyToOne, PrimaryColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Contribution } from './contribution.entity';

@Entity('repository')
export class Repository {
  @PrimaryColumn()
  @ManyToMany(() => Contribution, (contribution) => contribution.repository, {
    onDelete: 'SET NULL',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  owner: User;

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
}
