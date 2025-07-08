import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryHasAddService } from './inventory-has-add.service';
import { CreateInventoryHasAddDto } from './dto/create-inventory-has-add.dto';
import { UpdateInventoryHasAddDto } from './dto/update-inventory-has-add.dto';
import { FindOneWhitTermAndRelationDto, PaginationRelationsDto } from 'src/common';

@Controller()
export class InventoryHasAddController {
  constructor(private readonly inventoryHasAddService: InventoryHasAddService) {}

  @MessagePattern('createInventoryHasAdd')
  create(@Payload() createInventoryHasAddDto: CreateInventoryHasAddDto) {
    return this.inventoryHasAddService.create(createInventoryHasAddDto);
  }

  @MessagePattern('findAllInventoryHasAdd')
  findAll(@Payload() pagination: PaginationRelationsDto) {
    return this.inventoryHasAddService.findAll(pagination);
  }

  @MessagePattern('findOneInventoryHasAdd')
  findOne(@Payload() findOne: FindOneWhitTermAndRelationDto) {
    return this.inventoryHasAddService.findOne(findOne);
  }

  @MessagePattern('updateInventoryHasAdd')
  update(@Payload() updateInventoryHasAddDto: UpdateInventoryHasAddDto) {
    return this.inventoryHasAddService.update(updateInventoryHasAddDto);
  }

  @MessagePattern('removeInventoryHasAdd')
  remove(@Payload(){id}: {id: number}) {
    return this.inventoryHasAddService.remove(id);
  }
}
