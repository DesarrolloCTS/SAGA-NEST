import { PartialType } from '@nestjs/mapped-types';
import { CreateClasificationDto } from './create-clasification.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateClasificationDto extends PartialType(CreateClasificationDto) {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
