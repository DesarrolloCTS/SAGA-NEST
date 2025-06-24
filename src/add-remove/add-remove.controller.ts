import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddRemoveService } from './add-remove.service';
import { CreateAddRemoveDto } from './dto/create-add-remove.dto';
import { UpdateAddRemoveDto } from './dto/update-add-remove.dto';
import { FindOneWhitTermAndRelationDto, PaginationRelationsDto } from 'src/common';

@Controller()
export class AddRemoveController {
  constructor(private readonly addRemoveService: AddRemoveService) {}

  @MessagePattern('createAddRemove')
  create(@Payload() createAddRemoveDto: CreateAddRemoveDto) {
    return this.addRemoveService.create(createAddRemoveDto);
  }

  @MessagePattern('findAllAddRemove')
  findAll(@Payload() pagination: PaginationRelationsDto) {
    return this.addRemoveService.findAll(pagination);
  }

  @MessagePattern('findOneAddRemove')
  findOne(@Payload() findOne: FindOneWhitTermAndRelationDto) {
    return this.addRemoveService.findOne(findOne);
  }

  @MessagePattern('updateAddRemove')
  update(@Payload() updateAddRemoveDto: UpdateAddRemoveDto) {
    return this.addRemoveService.update(updateAddRemoveDto);
  }

  @MessagePattern('removeAddRemove')
  remove(@Payload() { id }: { id: number }) {
    return this.addRemoveService.remove(id);
  }
}
