import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IFindOne } from '../interfaces';
import { ToBoolean } from '../decorator/boolean';

export class FindOneWhitTermAndRelationDto implements Omit<IFindOne, 'term'> {
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Indica si se deben incluir las relaciones en la respuesta',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('relations')
  relations?: boolean = false;

  @ApiProperty({
    type: Boolean,
    required: false,
    description:
      'Indica si se deben incluir las relaciones eliminadas en la respuesta',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('deletes')
  deletes?: boolean = false;

  @ApiProperty({
    type: Boolean,
    required: false,
    description:
      'Indica si se deben incluir todas las relaciones en la respuesta',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('allRelations')
  allRelations?: boolean = false;
}

export class FindOneDeleteRelationsDto {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('relations')
  relations?: boolean = false;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('deletes')
  deletes?: boolean = false;
}

export class FindOneDto extends OmitType(FindOneWhitTermAndRelationDto, [
  'relations',
  'deletes',
] as const) {
  @ApiProperty({ type: String || Number, required: true })
  @IsString()
  @IsNotEmpty()
  term: string | number;
}

export class FindOneRelationsDto extends OmitType(
  FindOneWhitTermAndRelationDto,
  ['deletes'] as const,
) {
  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('relations')
  relations?: boolean = false;
}

export class FindOneDeleteDto extends OmitType(FindOneWhitTermAndRelationDto, [
  'relations',
] as const) {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ToBoolean('deletes')
  deletes?: boolean = false;
}