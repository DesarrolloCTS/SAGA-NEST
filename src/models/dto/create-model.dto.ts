import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  brandId: number
}
