import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { throwError } from 'rxjs';

@Injectable()
export class InventoriesService { 
  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventories`;
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException()
    }
    return `This action returns a #${id} inventory`;
  } 

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
