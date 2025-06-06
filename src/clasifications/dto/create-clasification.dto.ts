import { IClasificationsCreate } from "../../interfaces/clasifications.interface"
import {IsNotEmpty, IsString} from "class-validator"
export class CreateClasificationDto {
  @IsNotEmpty()
  @IsString()
  name: string
}
