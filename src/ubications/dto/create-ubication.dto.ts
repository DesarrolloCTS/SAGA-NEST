import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateUbicationDto {
  @IsString()
  @IsNotEmpty()
  ubications: string;



}
