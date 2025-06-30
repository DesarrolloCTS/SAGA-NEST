import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FindOneWhitTermAndRelationDto, PaginationDto, PaginationRelationsDto } from 'src/common';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('createInventory')
  create(@Payload() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @MessagePattern('findAllInventory')
  findAll(@Payload() pagination: PaginationRelationsDto) {
    return this.inventoryService.findAll(pagination);
  }

  @MessagePattern('findOneInventory')
  findOne(@Payload() findOne: FindOneWhitTermAndRelationDto) {
    return this.inventoryService.findOne(findOne);
  }

  @MessagePattern('updateInventory')
  update(@Payload() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(updateInventoryDto);
  }

  @MessagePattern('removeInventory')
  remove(@Payload() { id }: { id: number }) {
    return this.inventoryService.remove(id);
  }
}
