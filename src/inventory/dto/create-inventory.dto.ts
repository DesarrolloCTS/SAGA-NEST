import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  Idname: string;

  @IsNumber()
  @IsNumber()
  @IsPositive()
  stateId: number


  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  resourceId: number


}
