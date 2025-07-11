import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { STATUS_RESOURCE } from "src/common/constants/enums";
export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  Idname: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number

  @IsNumber()
  stateId: number

  @IsNumber()
  resourceId: number

  @IsEnum(STATUS_RESOURCE)
  @IsNotEmpty()
  status: STATUS_RESOURCE


  @IsNumber()
  ubications: number





}
