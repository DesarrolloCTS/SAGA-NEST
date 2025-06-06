import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor({
    code,
    message,
  }: {
      code: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${code} :: ${message}`);
  }

  public static createSignatureError(error: any) {
    //Error para llaves duplicadas en Postgres
    if (error.detail || error.code === '23505') {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
    //Errores de validaciones
    const status = error.message?.split(' :: ');
    if (status.length > 1) {
      throw new HttpException(error.message, HttpStatus[`${status[0]}`]);
    } else {
      if (error.message.includes('duplicate')) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}