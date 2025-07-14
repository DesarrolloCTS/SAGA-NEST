
import { IsNumber, IsString, ValidateNested } from "class-validator"
import { CreateResourceDto as createResourceDto } from "../../../resources/dto/create-resource.dto"
import { Type } from "class-transformer"

export class CreateAddRemoveDto {

  // Resource
  @ValidateNested()
  @Type(() => createResourceDto)
  resource: createResourceDto

  // Inventory
  @IsString()
  idName: string
  @IsString()
  serialNumber: string
  @IsNumber()
  ubications: number

 
}
