import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { ADD_REMOVE } from "../../common/constants/enums";


export class CreateAddRemoveDto {
  @IsString()
  @IsNotEmpty()    
  motive: string;

  @IsString()
  @IsNotEmpty()
  observations: string;


  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  idIventory: number[];

  @IsEnum(ADD_REMOVE)
  type: ADD_REMOVE

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  ubicationId: number

}
