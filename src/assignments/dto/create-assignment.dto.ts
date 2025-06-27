import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  date: string
  @IsString()
  @IsNotEmpty()
  hours: string
  

}
