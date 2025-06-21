import { PartialType } from '@nestjs/mapped-types';
import { CreateMantenanceDto } from './create-mantenance.dto';

export class UpdateMantenanceDto extends PartialType(CreateMantenanceDto) {
  id: number;
}
