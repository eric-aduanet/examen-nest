import { BadRequestException } from '@nestjs/common';
import { Shoe } from 'src/shoes/entities/shoes.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shoe, (shoeQty) => shoeQty.stock, { cascade: true })
  @JoinColumn()
  shoe: Shoe;

  @Column('integer')
  quantity: number;

  @Column('numeric')
  total: number;

  @BeforeInsert()
  verifyAndCalculate() {
    if (this.shoe.stock - this.quantity < 0)
      throw new BadRequestException(
        `No hay suficientes zapatos ${this.shoe.name} disponibles para satisfacer la venta`,
      );
    this.total = this.shoe.price * this.quantity;
    this.shoe.stock -= this.quantity;
  }
}
