import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import {  IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
