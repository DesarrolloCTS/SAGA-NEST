import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ADD_REMOVE } from "../../common/constants/enums";
export class CreateAddRemoveDto {
  @IsString()
  @IsNotEmpty()    
  motive: string;

  @IsString()
  @IsNotEmpty()
  observations: string;

  @IsNumber()
  idIventory: number[];

  @IsEnum(ADD_REMOVE)
  type: ADD_REMOVE

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  ubicationId: number

}
