import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addRemoval, InventoryHasAddRemoval } from 'cts-entities';
import { FindOneOptions, QueryRunner, Repository } from 'typeorm';

import {
  createResult,
  deleteResult,
  ErrorManager,
  FindOneWhitTermAndRelationDto,
  paginationResult,
  restoreResult,
} from 'src/common';
import { InventoryService } from 'src/inventory/inventory.service';
import { CreateAddRemoveDto } from '../inventory-has-add/dto/create-inventory-has-add-remove.dto';
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
  async create(
    acta_id: number,
    createDto: CreateAddRemoveDto,
    inventoryService: InventoryService,
    queryRunner: QueryRunner,
  ) {
    try {
      const { resource: _resource, ...rest } = createDto;

      const addRemoval = await this.addRemoveService.findOne({ term: acta_id });

      const resource = await this.resoruceService.findOneByName(_resource);

      const inventoryCrated = await createResult(
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
        queryRunner,
      );

      return inventoryCrated;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async updateInventoryHasPosition({
    idAdd,
    inventory_id,
    inventoryService,
    queryRunner,
  }: {
    idAdd: addRemoval;
    inventory_id: number[];
    inventoryService: InventoryService;
    queryRunner: QueryRunner;
  }) {
    try {
      const inventoryHasAddRemoval =
        await this.inventoryHasAddRemovalRepository.find({
          where: { addRemoval: { id: idAdd.id } },
          withDeleted: true,
          relations: {
            inventory: true,
            addRemoval: true,
          },
        });

      const inventoryToDelete = inventoryHasAddRemoval.filter((el) => {
        return (
          el.inventory.deleted_at === null &&
          !inventory_id.includes(el.inventory.id)
        );
      });

      await Promise.all(
        inventoryToDelete.map(async ({ id }) => {
          await deleteResult(
            this.inventoryHasAddRemovalRepository,
            id,
            queryRunner,
          );
        }),
      );

      return await Promise.all(
        inventory_id.map(async (el) => {
          const inventory = inventoryHasAddRemoval.find(
            (inventoryHasAddRemoval) => {
              return inventoryHasAddRemoval.inventory.id === el;
            },
          );

          let result;
          if (inventory) {
            if (inventory.deleted_at !== null) {
              await restoreResult(
                this.inventoryHasAddRemovalRepository,
                inventory.id,
                queryRunner,
              );
            }

            result = inventory;
          } else {
            const newInventory = await inventoryService.findOne({
              term: el,
              relations: true,
            });

            result = await createResult(
              this.inventoryHasAddRemovalRepository,
              {
                addRemoval: idAdd,
                inventory: newInventory,
              },
              InventoryHasAddRemoval,
              queryRunner,
            );
          }
          return result;
        }),
      );
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

  async deletePositions(id: number, queryRunner?: QueryRunner) {
    return await deleteResult(this.inventoryHasAddRemovalRepository, id);
  }
}
