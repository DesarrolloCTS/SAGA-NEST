import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
