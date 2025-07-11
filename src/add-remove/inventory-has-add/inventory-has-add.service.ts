import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addRemoval, Inventory } from 'cts-entities';
import { createResult, deleteResult, ErrorManager, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult, restoreResult } from 'src/common';
import { FindOneOptions, QueryRunner, Repository } from 'typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { InventoryHasAddRemoval } from 'cts-entities';


@Injectable()
export class InventoryHasAddService {

  constructor(
    @InjectRepository(InventoryHasAddRemoval)
    private readonly inventoryHasAddRemoval: Repository<InventoryHasAddRemoval>,
  ) { }
  async create(
    idAdd: addRemoval,
    inventory: Inventory[],
    queryRunner: QueryRunner
  ) {
    try {

      const result = await Promise.all(
        inventory.map(async (el) => {
          return await createResult(
            this.inventoryHasAddRemoval,
            {
              addRemoval: idAdd,
              inventory: el,
            },
            InventoryHasAddRemoval,
            queryRunner,
          );
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }

  }

  async updateInventoryHasPosition(
    {
      idAdd,
      inventory_id,
      inventoryService,
      queryRunner,
    }: {
      idAdd: addRemoval;
      inventory_id: number[];
      inventoryService: InventoryService;
      queryRunner: QueryRunner;
    },
  ) {

    try {
      const inventoryHasAddRemoval = await this.inventoryHasAddRemoval.find({
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
          await deleteResult(this.inventoryHasAddRemoval, id, queryRunner);
        }),
      );

      return await Promise.all(
        inventory_id.map(async (el) => {
          const inventory = inventoryHasAddRemoval.find((inventoryHasAddRemoval) => {
            return inventoryHasAddRemoval.inventory.id === el;
          });

          let result;
          if (inventory) {
            if (inventory.deleted_at !== null) {
              await restoreResult(
                this.inventoryHasAddRemoval,
                inventory.id,
                queryRunner
              );
            }

            result = inventory;
          } else {
            const newInventory = await inventoryService.findOne({ term: el, relations: true });

            result = await createResult(
              this.inventoryHasAddRemoval,
              {
                addRemoval: idAdd,
                inventory: newInventory,

              },
              InventoryHasAddRemoval,
              queryRunner
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

  async findOneByActa(
    term,
    deletes,
    relations,
    allRelations
  ) {
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
      const result = await paginationResult(this.inventoryHasAddRemoval, {
        all: true,
        options,
      })
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
        }

      })

      if (data.length <= 0) {
        throw new ErrorManager({
          message: 'NOT_FOUND',
          code: 'NOT_FOUND',
        })
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
    return await deleteResult(this.inventoryHasAddRemoval, id);
  }



}

