import { PartialType } from '@nestjs/mapped-types';
import { CreateUbicationDto } from './create-ubication.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateUbicationDto extends PartialType(CreateUbicationDto) {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
