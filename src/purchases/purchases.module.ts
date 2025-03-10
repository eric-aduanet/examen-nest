import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ShoesModule } from 'src/shoes/shoes.module';
import { ShoesService } from 'src/shoes/shoes.service';
import { Shoe } from 'src/shoes/entities/shoes.entity';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [TypeOrmModule.forFeature([Purchase, Shoe]), ShoesModule],
})
export class PurchasesModule {}
