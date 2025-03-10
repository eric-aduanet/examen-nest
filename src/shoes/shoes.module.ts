import { Module } from '@nestjs/common';
import { ShoesService } from './shoes.service';
import { ShoesController } from './shoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from './entities/shoes.entity';

@Module({
  controllers: [ShoesController],
  providers: [ShoesService],
  imports: [TypeOrmModule.forFeature([Shoe])],
  exports: [ShoesService],
})
export class ShoesModule {}
