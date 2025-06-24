import { Injectable } from '@nestjs/common';
import { CreateAddRemoveDto } from './dto/create-add-remove.dto';
import { UpdateAddRemoveDto } from './dto/update-add-remove.dto';
import { createResult } from 'src/common';
import { In, Repository } from 'typeorm';
import { addRemoval } from 'cts-entities/src/entities/addRemoval.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'cts-entities/src/entities/inventory.entity';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class AddRemoveService {
  constructor(
    @InjectRepository(addRemoval)
    private readonly addRemovalRepository: Repository<addRemoval>,
    private readonly inventoryService: InventoryService
  ) {}
  async create(createAddRemoveDto: CreateAddRemoveDto) {
    
    try {
    
      const inventoryExist = await this.inventoryService.findOne(
        {
          term: createAddRemoveDto.idIventory
        }        
      )      
      const addRemove = await createResult(
        this.addRemovalRepository,
        {
          ...createAddRemoveDto,
          inventory: inventoryExist
        },
        addRemoval,       
          
      )
        return addRemove
      }
     catch (error) {
      console.log(error);
    }
  }
  

  findAll() {
    return `This action returns all addRemove`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addRemove`;
  }

  update(id: number, updateAddRemoveDto: UpdateAddRemoveDto) {
    return `This action updates a #${id} addRemove`;
  }

  remove(id: number) {
    return `This action removes a #${id} addRemove`;
  }
}
