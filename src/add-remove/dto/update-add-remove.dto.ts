import { PartialType } from '@nestjs/mapped-types';
import { CreateAddRemoveDto } from './create-add-remove.dto';

export class UpdateAddRemoveDto extends PartialType(CreateAddRemoveDto) {
  id: number;
}
