

export interface IBrands{
  id: number,
  name: string
}

export interface IBrandsCreate extends Omit<IBrands, 'id'>{}