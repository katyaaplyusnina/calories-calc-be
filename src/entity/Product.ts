import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  protein!: number;

  @Column()
  fat!: number;

  @Column()
  carbs!: number;

  @Column({ name: 'default_weight' })
  defaultWeight!: number;

  @Column({ name: 'is_trusted' })
  isTrusted!: boolean;
}
