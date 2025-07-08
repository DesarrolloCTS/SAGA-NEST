import { Injectable } from '@nestjs/common';
import { CreateInventoryHasAddDto } from './dto/create-inventory-has-add.dto';
import { UpdateInventoryHasAddDto } from './dto/update-inventory-has-add.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryHasAdd } from './entities/inventory-has-add.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AddRemoveService } from 'src/add-remove/add-remove.service';
import { deleteResult, ErrorManager, findOneByTerm, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult } from 'src/common';

@Injectable()
export class InventoryHasAddService {
  constructor(
    @InjectRepository(InventoryHasAdd)
    private readonly inventoryHasAddRepository: Repository<InventoryHasAdd>,
    private readonly inventoryService: InventoryService,
    private readonly addRemoveService: AddRemoveService
) {}

  create(createInventoryHasAddDto: CreateInventoryHasAddDto) {

try {
  const { idInventory, idAdd } = createInventoryHasAddDto;
  const inventory = this.inventoryService.findOne({ term: idInventory, relations: true });
  const add = this.addRemoveService.findOne({ term: idAdd, relations: true });
  return this.inventoryHasAddRepository.save({ inventory, add });
} catch (error) {
  console.log(error);
  throw ErrorManager.createSignatureError(error);
  
}
  
  }

  findAll(pagination: PaginationRelationsDto) {
  try {
    const option: FindManyOptions<InventoryHasAdd> = {};
    if (pagination.relations)
      option.relations = { inventory: true, add: true };
    const result = paginationResult(this.inventoryHasAddRepository, {
      ...pagination,
      options: option,
    });
    return result;

  } catch (error) {
    console.log(error);
    throw ErrorManager.createSignatureError(error);
    
  }
  }

  findOne({term:id, relations}:FindOneWhitTermAndRelationDto ){
    try {
      const options : FindOneOptions<InventoryHasAdd> = {};
      if (relations) options.relations = { inventory: true, add: true };

      const result = findOneByTerm({
        repository: this.inventoryHasAddRepository,
        term: id,
        options,
      });

      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
      
    }
  }

  update(updateInventoryHasAddDto: UpdateInventoryHasAddDto) {
    try {
      const { id, ...res } = updateInventoryHasAddDto;
      const inventoryHasAdd = this.findOne({ term: id, relations: true });
      Object.assign(inventoryHasAdd, res);
      return this.inventoryHasAddRepository.save(inventoryHasAdd);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }

  }

  remove(id: number) {
    try {
      return deleteResult(this.inventoryHasAddRepository, id);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
}
