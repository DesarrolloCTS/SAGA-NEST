import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  serialNumer: string;

  @IsString()
  @IsNotEmpty()
  especifications: string;
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  clasificationId: number;
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  modelId: number;
}
