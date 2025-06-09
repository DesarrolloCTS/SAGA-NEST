import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
