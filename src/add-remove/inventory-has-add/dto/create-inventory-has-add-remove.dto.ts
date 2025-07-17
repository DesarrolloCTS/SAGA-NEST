
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateResourceDto as createResourceDto } from '../../../resources/dto/create-resource.dto';
import { Type } from 'class-transformer';

export class CreateHasAddRemoveDto {
  // Resource
  @ValidateNested()
  @Type(() => createResourceDto)
  resource: createResourceDto;
  //Id del acta
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idActa: number;
  // Inventory
  @IsString()
  idName: string;
  @IsString()
  serialNumber: string;
  @IsNumber()
  ubications: number;
}
