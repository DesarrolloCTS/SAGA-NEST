import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IPaginateFilter, IPagination } from '../interfaces';

export class PaginationDto implements IPagination {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  all?: boolean = false;
}

export class PaginationRelationsDto extends PaginationDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  relations?: boolean;
}

