import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateShoeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  brand: string;

  @IsNumber()
  @Min(5, { message: 'La talla debe ser mayor o igual a 5' })
  @Max(13, { message: 'La talla debe ser menor o igual a 13' })
  size: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  gender: string | 'Hombre' | 'Mujer' | 'Unisex';

  @IsString()
  category: string;

  // Un zapato siempre esta activo al crearse
  // @IsBoolean()
  // activo?: boolean;
}
