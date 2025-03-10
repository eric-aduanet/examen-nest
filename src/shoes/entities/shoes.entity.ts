import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shoes' })
export class Shoe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  brand: string;

  @Column('numeric', {
    precision: 3,
    scale: 1,
  })
  size: number;

  @Column('numeric')
  price: number;

  @Column('integer', { default: 0 })
  stock: number;

  @Column('text')
  gender: string;

  @Column('text')
  category: string;

  @Column('boolean', { default: true })
  active: boolean;
}
