

export interface IClasifications{
  id: number,
  name: string
}

export interface IClasificationsCreate extends Omit<IClasifications, 'id'>{}