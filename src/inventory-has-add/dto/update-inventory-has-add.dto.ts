import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryHasAddDto } from './create-inventory-has-add.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateInventoryHasAddDto extends PartialType(CreateInventoryHasAddDto) {
  @IsNumber()
  @IsPositive()
  id: number;
}
