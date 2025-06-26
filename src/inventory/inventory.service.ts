import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
//TODO: CAMBIAR A CTS-ENTITIES
import { Inventory } from '../../../cts-entities/src/entities/inventory.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createResult, deleteResult, ErrorManager, findOneByTerm, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult, updateResult } from 'src/common';
import { StateService } from 'src/state/state.service';
import { ResourcesService } from 'src/resources/resources.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>,
    private readonly stateServices: StateService,
    private readonly resourceServices: ResourcesService
  ) { }
  async create(createInventoryDto: CreateInventoryDto) {
    try {
      const { stateId, resourceId, addRemovalId, ...CreateInventoryDto } = createInventoryDto
      const stateExist = await this.stateServices.findOne(createInventoryDto.stateId)
      const resourceExist = await this.resourceServices.findOne({ term: createInventoryDto.resourceId })
      const addRemovalExist = await this.resourceServices.findOne({ term: createInventoryDto.addRemovalId })
      const ubicationExist = await this.resourceServices.findOne({ term: createInventoryDto.ubications })

      if (!stateExist && !resourceExist && !addRemovalExist && !ubicationExist) {
        return ErrorManager.createSignatureError(`stateId: ${createInventoryDto.stateId}, resourceId: ${createInventoryDto.resourceId}, addRemovalId: ${createInventoryDto.addRemovalId} ubicationId: ${createInventoryDto.ubications} not found`)
      }
      const result = await createResult(
        this.inventoryRepository,
        {
          ...CreateInventoryDto, addRemoval: addRemovalExist, state: stateExist, resource: resourceExist, ubications: ubicationExist
        },
        Inventory
      )

      return result
    } catch (error) {

    }
  }

  async findAll(pagination: PaginationRelationsDto) {
    try {
      const option: FindManyOptions<Inventory> = {}
      if (pagination.relations) option.relations = {
        state: true,
        resource: {
          clasification: true,
          model: true
        }
      }
      const result = await paginationResult(this.inventoryRepository, { ...pagination, options: option });
      return result;
    }

    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOne(id: FindOneWhitTermAndRelationDto) {
    try {
      const option: FindManyOptions<Inventory> = {}
      if (id.relations) option.relations = {
        state: true,
        resource: {
          clasification: true,
          model: true
        }
      }
      const result = findOneByTerm({
        repository: this.inventoryRepository,
        term: id.term,
        options: option
      })
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateInventoryDto: UpdateInventoryDto) {
    try {
      const { id, ...rest } = updateInventoryDto;
      const { stateId, resourceId } = rest



      const inventory = await findOneByTerm({
        repository: this.inventoryRepository,
        term: id,
      });
      Object.assign(inventory, rest);
      const result = await updateResult(this.inventoryRepository, id, inventory);
      return result;

    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try {
      return await deleteResult(this.inventoryRepository, id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
