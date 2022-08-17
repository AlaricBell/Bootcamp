import { Column, Entity, PrimaryColumn, ManyToMany } from 'typeorm';
import { Contribution } from './contribution.entity';

@Entity('user')
export class User {
  @PrimaryColumn()
  @ManyToMany(() => Contribution, (contribution) => contribution.user)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  avatar_url: string;

  @Column({ type: 'varchar', length: 255 })
  html_url: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;
}
