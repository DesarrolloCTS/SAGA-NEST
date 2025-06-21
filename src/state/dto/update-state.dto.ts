import { PartialType } from '@nestjs/mapped-types';
import { CreateStateDto } from './create-state.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateStateDto extends PartialType(CreateStateDto) {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
