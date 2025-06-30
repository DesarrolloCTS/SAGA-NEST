import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
