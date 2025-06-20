import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {
  FindOneWhitTermAndRelationDto,
  PaginationRelationsDto,
} from 'src/common';

@Controller()
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @MessagePattern('createResource')
  create(@Payload() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @MessagePattern('findAllResources')
  findAll(@Payload() pagination: PaginationRelationsDto) {
    return this.resourcesService.findAll(pagination);
  }

  @MessagePattern('findOneResource')
  findOne(@Payload() findOne: FindOneWhitTermAndRelationDto) {
    return this.resourcesService.findOne(findOne);
  }

  @MessagePattern('updateResource')
  update(@Payload() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(updateResourceDto);
  }

  @MessagePattern('removeResource')
  remove(@Payload() { id }: { id: number }) {
    return this.resourcesService.remove(id);
  }
}
