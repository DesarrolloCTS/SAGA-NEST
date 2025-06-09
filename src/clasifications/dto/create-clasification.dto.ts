import { IsNotEmpty, IsString } from "class-validator";

export class CreateClasificationDto {
  @IsString()
  @IsNotEmpty()
name: string
}
