import { PartialType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-model.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateModelDto extends PartialType(CreateModelDto) {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()

  id: number;
}
