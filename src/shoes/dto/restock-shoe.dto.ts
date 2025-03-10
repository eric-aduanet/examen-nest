import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class RestockShoeDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @IsPositive()
  stock: number;
}
