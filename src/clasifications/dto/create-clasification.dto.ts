import { IClasificationsCreate } from "../interfaces/clasifications.entity"
import {IsNotEmpty, IsString} from "class-validator"
export class CreateClasificationDto {
  @IsNotEmpty()
  @IsString()
  name: string
}
