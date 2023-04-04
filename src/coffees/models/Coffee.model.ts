import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Flavor } from './Flavor.model.ts';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  recommendations: number;

  @ManyToOne(
    () => Flavor,
    (flavor) => flavor.name, 
    {
      cascade: true,
      nullable: true
    }
    )
  @JoinColumn()
  flavor: Flavor;
}