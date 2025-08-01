import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ASSIGNMENT_STATUS } from 'src/common/constants/enums';
export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  date: string;
  @IsString()
  @IsNotEmpty()
  hours: string;
  @IsString()
  accessories: string;
  @IsEnum(ASSIGNMENT_STATUS)
  type: ASSIGNMENT_STATUS;
}
