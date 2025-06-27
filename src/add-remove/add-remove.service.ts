import { Injectable } from '@nestjs/common';
import { CreateAddRemoveDto } from './dto/create-add-remove.dto';
import { UpdateAddRemoveDto } from './dto/update-add-remove.dto';
import { createResult, deleteResult, ErrorManager, findOneByTerm, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult, runInTransaction } from 'src/common';
import { DataSource, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { addRemoval } from 'cts-entities/src/entities/addRemoval.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'cts-entities/src/entities/inventory.entity';
import { InventoryService } from 'src/inventory/inventory.service';
import { run } from 'node:test';

@Injectable()
export class AddRemoveService {
  constructor(
    @InjectRepository(addRemoval)
    private readonly addRemovalRepository: Repository<addRemoval>,
    private readonly inventoryService: InventoryService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createAddRemoveDto: CreateAddRemoveDto) {
    
    try { 
      return runInTransaction(this.dataSource, async (queryRunner) => {

        const { idIventory, type, ...rest } = createAddRemoveDto

        const addRemove = await createResult(
          this.addRemovalRepository,
          {
            ...createAddRemoveDto,
            type: createAddRemoveDto.type
          },
          addRemoval,
          queryRunner,
        )
        return addRemove
      }
      )
    }
    catch (error) {
      console.log(error);
    }
  }
  

  async findAll(
    pagination: PaginationRelationsDto
  ) {
    try {
      const options: FindManyOptions<addRemoval> = {};
      if (pagination.relations) {
        options.relations = {
          inventory: {
            resource: {
              clasification: true,
              model: true
            }
          },

        };
      }

      return await paginationResult(this.addRemovalRepository, {
        ...pagination,
        options,
      })
    } catch (error) {

    }
  }

  findOne(
    { term: id,
      relations = false,
    }: FindOneWhitTermAndRelationDto) {
    try {
      const options: FindOneOptions<addRemoval> = {};

      if (relations) {
        options.relations = {
          inventory: {
            resource: {
              clasification: true,
              model: true
            }
          },

        };
      }
      const result = findOneByTerm({
        repository: this.addRemovalRepository,
        term: id,
        options,
      });

      return result;

    } catch (error) {

    }
  }

  update(updateAddRemoveDto: UpdateAddRemoveDto) {
    try {
      return runInTransaction(this.dataSource, async (queryRunner) => {

        const { id, idIventory, ...rest } = updateAddRemoveDto;

        const addRemove = await this.findOne({
          term: id,
          relations: true
        })






      }
      )
    }
    catch (error) {
      console.log(error);
    }
  } 

  remove(id: number) {
    try {
      return deleteResult(this.addRemovalRepository, id);
    }
    catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
}
