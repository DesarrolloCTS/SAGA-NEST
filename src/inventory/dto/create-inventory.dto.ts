import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNumber()
  @IsPositive()
  stateId: number


}
