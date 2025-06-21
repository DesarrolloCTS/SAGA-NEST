import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EnablingService } from './enabling.service';
import { CreateEnablingDto } from './dto/create-enabling.dto';
import { UpdateEnablingDto } from './dto/update-enabling.dto';
import { FindOneWhitTermAndRelationDto, PaginationDto } from 'src/common';

@Controller()
export class EnablingController {
  constructor(private readonly enablingService: EnablingService) {}

  @MessagePattern('createEnabling')
  create(@Payload() createEnablingDto: CreateEnablingDto) {
    return this.enablingService.create(createEnablingDto);
  }

  @MessagePattern('findAllEnabling')
  findAll(@Payload() pagination: FindOneWhitTermAndRelationDto) {
    return this.enablingService.findAll(pagination);
  }
  
  @MessagePattern('findOneEnabling')
  findOne(@Payload() findOne: FindOneWhitTermAndRelationDto) {
    return this.enablingService.findOne(findOne);
  }

  @MessagePattern('updateEnabling')
  update(@Payload() updateEnablingDto: UpdateEnablingDto) {
    return this.enablingService.update( updateEnablingDto);
  }

  @MessagePattern('removeEnabling')
  remove(@Payload() { id }: { id: number }) {
    return this.enablingService.remove(id);
  }
}
