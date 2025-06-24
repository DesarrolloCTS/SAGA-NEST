import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAddRemoveDto {
  @IsString()
  @IsNotEmpty()    
  motive: string;

  @IsString()
  @IsNotEmpty()
  observations: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  idIventory: number
  

}
