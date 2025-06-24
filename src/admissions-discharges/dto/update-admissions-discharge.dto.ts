import { PartialType } from '@nestjs/mapped-types';
import { CreateAdmissionsDischargeDto } from './create-admissions-discharge.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateAdmissionsDischargeDto extends PartialType(CreateAdmissionsDischargeDto) {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
