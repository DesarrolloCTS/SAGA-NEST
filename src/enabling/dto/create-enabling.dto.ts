import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateEnablingDto {
  @IsDate()
  @IsNotEmpty()
  date: Date

  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  isRed: string
  @IsString()
  @IsNotEmpty()
  isLuz: string
  @IsString()
  @IsNotEmpty()
  isExtra: string



}
