import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory, Ubications } from 'cts-entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createResult,
  deleteResult,
  ErrorManager,
  findOneByTerm,
  FindOneWhitTermAndRelationDto,
  PaginationFilterAssigmentsDto,
  paginationResult,
  updateResult,
} from 'src/common';

import { StateService } from 'src/state/state.service';
import { UbicationsService } from 'src/ubications/ubications.service';
import { aumentarStock, disminuirStock } from 'src/common/helpers/modifyStock';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly stateServices: StateService,   
    private readonly ubicationsService: UbicationsService

  ) { }
  async create(createInventoryDto: CreateInventoryDto) {
    try {

      const {

        user_id,
        ubications,
        status,
        ...CreateInventoryDto
      } = createInventoryDto;

      let stateExist = await this.stateServices.findOne(
        createInventoryDto.stateId,
      );

      let ubicationExist = await this.ubicationsService.findOne(
          createInventoryDto.ubications,
      );


      const result = await createResult(
        this.inventoryRepository,
        {
          ...CreateInventoryDto,
          ubications: ubicationExist,
          state: stateExist,
          status: status

        },
        Inventory,
      );


      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findAll(pagination: PaginationFilterAssigmentsDto<Inventory>) {
    try {
      const option: FindManyOptions<Inventory> = {};
      if (pagination.relations)
        if (pagination.status) {
          option.where = { status: pagination.status };
        }
        option.relations = {
          state: true,
          resource: {
            clasification: true,
            model: true,
          },
        };
      const result = await paginationResult(this.inventoryRepository, {
        ...pagination,
        options: option,
      });
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOne({ term: id, relations }: FindOneWhitTermAndRelationDto) {
    try {
      const option: FindOneOptions<Inventory> = {};
      if (relations)
        option.relations = {
          state: true,
          resource: {
            clasification: true,
            model: true,
          },
        };
      const result = findOneByTerm({
        repository: this.inventoryRepository,
        term: id,
        options: option,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateInventoryDto: UpdateInventoryDto) {
    try {
      const { id, ...rest } = updateInventoryDto;
      const inventory = await findOneByTerm({
        repository: this.inventoryRepository,
        term: id,
      });
      Object.assign(inventory, rest);
      const result = await updateResult(
        this.inventoryRepository,
        id,
        inventory,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try {
      await disminuirStock(id);
      return await deleteResult(this.inventoryRepository, id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}

