import { IsArray, IsOptional, IsString } from 'class-validator';

export class ShoeDetailsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gender?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  category?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  brand?: string[];
}
