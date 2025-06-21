import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MantenanceService } from './mantenance.service';
import { CreateMantenanceDto } from './dto/create-mantenance.dto';
import { UpdateMantenanceDto } from './dto/update-mantenance.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class MantenanceController {
  constructor(private readonly mantenanceService: MantenanceService) {}

  @MessagePattern('createMantenance')
  create(@Payload() createMantenanceDto: CreateMantenanceDto) {
    return this.mantenanceService.create(createMantenanceDto);
  }

  @MessagePattern('findAllMantenance')
  findAll(@Payload() pagination: PaginationDto) {
    return this.mantenanceService.findAll(pagination);
  }

  @MessagePattern('findOneMantenance')
  findOne(@Payload(){id}: {id: number}) {
    return this.mantenanceService.findOne(id);
  }

  @MessagePattern('updateMantenance')
  update(@Payload() updateMantenanceDto: UpdateMantenanceDto) {
    return this.mantenanceService.update(updateMantenanceDto.id, updateMantenanceDto);
  }

  @MessagePattern('removeMantenance')
  remove(@Payload() {id}: {id: number}) {
    return this.mantenanceService.remove(id);
  }
}
