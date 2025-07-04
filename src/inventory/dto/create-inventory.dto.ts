import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  Idname: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  user_id: number

  @IsNumber()  
  stateId: number

  @IsNumber()
  resourceId: number

  @IsNumber()
  addRemovalId: number

  @IsNumber()
  ubications: number

  @IsNumber()  
  assignmentId: number

  @IsNumber()
  admissionsDischargesId: number

  @IsNumber()
  habilitationId: number

  @IsNumber()
  mantenanceId: number



}
