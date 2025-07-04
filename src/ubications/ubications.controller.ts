import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UbicationsService } from './ubications.service';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class UbicationsController {
  constructor(private readonly ubicationsService: UbicationsService) {}

  @MessagePattern('createUbication')
  create(@Payload() createUbicationDto: CreateUbicationDto) {
    return this.ubicationsService.create(createUbicationDto);
  }

  @MessagePattern('findAllUbications')
  findAll(pagination: PaginationDto) {
    return this.ubicationsService.findAll(pagination);
  }

  @MessagePattern('findOneUbication')
  findOne(@Payload(){id} :{id: number}) {
    return this.ubicationsService.findOne(id);
  }

  @MessagePattern('updateUbication')
  update(@Payload() updateUbicationDto: UpdateUbicationDto) {
    return this.ubicationsService.update(updateUbicationDto);
  }

  @MessagePattern('removeUbication')
  remove(@Payload() { id }: {id: number}) {
    return this.ubicationsService.remove(id);
  }
}
