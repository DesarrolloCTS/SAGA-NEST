import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAdmissionsDischargeDto {

  @IsString()
  @IsNotEmpty()
  motive: string;
  @IsNotEmpty()
  @IsString()
  observations: string;
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  typeId: number
}
