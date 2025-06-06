import { OmitType } from "@nestjs/mapped-types"

export interface IClasifications{
  id: number,
  name: string
}

export interface IClasificationsCreate extends Omit<IClasifications, 'id'>{}