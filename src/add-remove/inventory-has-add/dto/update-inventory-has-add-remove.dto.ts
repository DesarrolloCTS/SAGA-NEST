import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateHasAddRemoveDto } from './create-inventory-has-add-remove.dto';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateHasAddRemoveDto {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  idActa: number;

  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  itemId: number[];
}
