import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

export type GoalType = 'loss' | 'maintain' | 'gain';

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  weight!: number;

  @Column({ type: 'int' })
  height!: number;

  @Column({ type: 'int' })
  age!: number;

  @Column({ type: 'enum', enum: ['loss', 'maintain', 'gain'] })
  goal!: GoalType;

  @OneToOne(() => User, (user) => user.settings, { onDelete: 'RESTRICT' })
  @JoinColumn()
  user!: User;
}
