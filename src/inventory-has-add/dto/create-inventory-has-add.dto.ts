import { isNumber, IsNumber, IsPositive } from "class-validator";

export class CreateInventoryHasAddDto {

  @IsNumber()
  @IsPositive()
  idInventory: number

  @IsPositive()
  @IsNumber()
  idAdd: number

}
