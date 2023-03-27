import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;
}