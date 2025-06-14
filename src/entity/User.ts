import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserSettings } from './UserSettings';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  login!: string;

  @Column()
  passwordHash!: string;

  @OneToOne(() => UserSettings, (settings) => settings.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  settings?: UserSettings;
}
