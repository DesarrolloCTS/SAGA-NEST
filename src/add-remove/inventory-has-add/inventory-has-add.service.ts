import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryHasAddRemoval } from 'cts-entities';
import { FindOneOptions, Repository } from 'typeorm';

import {
  createResult,
  deleteResult,
  ErrorManager,
  FindOneWhitTermAndRelationDto,
  paginationResult,
  restoreResult,
} from 'src/common';

import { CreateHasAddRemoveDto } from '../inventory-has-add/dto/create-inventory-has-add-remove.dto';
import { ResourcesService } from '../../resources/resources.service';
import { AddRemoveService } from '../add-remove.service';

@Injectable()
export class InventoryHasAddService {
  constructor(
    @InjectRepository(InventoryHasAddRemoval)
    private readonly inventoryHasAddRemovalRepository: Repository<InventoryHasAddRemoval>,
    private readonly resoruceService: ResourcesService,
    private readonly addRemoveService: AddRemoveService,
  ) {}
  async create(createDto: CreateHasAddRemoveDto) {
    try {
      const { resource: _resource, idActa, ...rest } = createDto;

      const addRemoval = await this.addRemoveService.findOne({ term: idActa });

      const resource = await this.resoruceService.findOneByName(_resource);

      let inventoryCrated: InventoryHasAddRemoval | null;

      inventoryCrated = await this.inventoryHasAddRemovalRepository.findOne({
        where: {
          addRemoval,
          inventory: {
            idName: rest.idName,
            serialNumber: rest.serialNumber,
            resource: { id: resource.id },
          },
        },
        relations: { addRemoval: true },
        withDeleted: true,
      });

      if (inventoryCrated) {
        return inventoryCrated.deleted_at
          ? await restoreResult(
              this.inventoryHasAddRemovalRepository,
              inventoryCrated.id,
            )
          : inventoryCrated;
      }

      inventoryCrated = await createResult(
        this.inventoryHasAddRemovalRepository,
        {
          addRemoval,
          inventory: {
            idName: rest.idName,
            serialNumber: rest.serialNumber,
            resource,
          },
        },
        InventoryHasAddRemoval,
      );

      return inventoryCrated;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOneByActa({
    term,
    deletes,
    relations,
    allRelations,
  }: FindOneWhitTermAndRelationDto) {
    try {
      const options: FindOneOptions<InventoryHasAddRemoval> = {
        where: { addRemoval: { id: +term } },
        relations: { addRemoval: true },
      };

      if (relations || allRelations) {
        options.relations = {
          ...options.relations,
          inventory: true,
        };
      }

      if (allRelations) {
        options.relations = {
          ...options.relations,
          addRemoval: true,
          inventory: {
            state: true,
            resource: {
              clasification: true,
              model: true,
            },
          },
        };
      }

      if (deletes) {
        options.withDeleted = true;
      }

      const result = await paginationResult(
        this.inventoryHasAddRemovalRepository,
        {
          all: true,
          options,
        },
      );

      const data = result.data.map((el: InventoryHasAddRemoval) => {
        return {
          inventory: !relations
            ? {
                id: el.id,
                created_at: el.created_at,
                updated_at: el.updated_at,
                deleted_at: el.deleted_at,
              }
            : el.inventory,
        };
      });

      if (data.length <= 0) {
        throw new ErrorManager({
          message: 'NOT_FOUND',
          code: 'NOT_FOUND',
        });
      }

      return {
        ...result,
        data: {
          addRemoval: result.data[0].addRemoval.id,
          inventory_id: data,
        },
      };
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async restore(id: number) {
    try {
      return await restoreResult(this.inventoryHasAddRemovalRepository, id);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
  async deletePositions(id: number) {
    return await deleteResult(this.inventoryHasAddRemovalRepository, id);
  }
}
