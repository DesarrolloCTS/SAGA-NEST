import { PartialType } from '@nestjs/mapped-types';
import { CreateEnablingDto } from './create-enabling.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateEnablingDto extends PartialType(CreateEnablingDto) {
   @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    id: number;  
}
