import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDto } from './create-type.dto';
import { IsNotEmpty, IsNumber, isNumber, IsPositive } from 'class-validator';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;
}
