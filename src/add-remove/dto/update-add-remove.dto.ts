import { PartialType } from '@nestjs/mapped-types';
import { CreateAddRemoveDto } from './create-add-remove.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateAddRemoveDto extends PartialType(CreateAddRemoveDto) {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
