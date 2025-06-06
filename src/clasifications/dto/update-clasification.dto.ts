import { PartialType } from '@nestjs/mapped-types';
import { CreateClasificationDto } from './create-clasification.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
export class UpdateClasificationDto extends PartialType(CreateClasificationDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number
}
