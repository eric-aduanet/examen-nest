import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  @IsUUID()
  shoeId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
