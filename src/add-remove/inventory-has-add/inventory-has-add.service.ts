import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addRemoval, Inventory, inventoryHasAddRemoval} from 'cts-entities';
import { createResult, deleteResult, ErrorManager, restoreResult } from 'src/common';
import { QueryRunner, Repository } from 'typeorm';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class InventoryHasAddService {

  constructor(
    @InjectRepository(inventoryHasAddRemoval)
    private readonly inventoryHasAddRemoval: Repository<inventoryHasAddRemoval>,
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
             addRemoval : idAdd,
            inventory: el,
            },
            inventoryHasAddRemoval,
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
    idAdd: addRemoval,
    inventory_id: Inventory[],
    queryRunner: QueryRunner
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

        const inventoryToDelete = inventoryHasAddRemoval.filter((inventoryHasAddRemoval) => {
          return (
            inventoryHasAddRemoval.inventory.deleted_at === null &&
            !inventory_id.includes(inventoryHasAddRemoval.inventory)
          );
        });

        await Promise.all(
          inventoryToDelete.map(async ({ id }) => {
            await deleteResult(this.inventoryHasAddRemoval, id);
          }),
        );

        const result = await Promise.all(
          inventory_id.map(async (el) => {
            const inventory = inventoryHasAddRemoval.find((inventoryHasAddRemoval) => {
              return inventoryHasAddRemoval.inventory === el;
            });

            let result: inventoryHasAddRemoval;
            if (inventory) {
              if (inventory.deleted_at !== null) {
                await restoreResult(
                  this.inventoryHasAddRemoval,
                  inventory.id,
                  
                );
              }

              result = inventory;
            } else {
              const newInventory = await InventoryService.findOne({
                term: el.id,
                relations: {
                  state: true,
                  resource: {
                    clasification: true,
                    model: true,
                  },
                },
              });
            

              result = await createResult(
                this.inventoryHasAddRemoval,
                {
                  addRemoval: idAdd,
                  inventory: newInventory,
                },
                inventoryHasAddRemoval,
                
              );
            }
            return result;
          }),
        );

       /*  // TODO: Actualizar el staffing
        const newPosition = result.filter(
          (el) => !position_id.includes(el.position_id.id),
        );

        const payload: IUpdateForCahngesInEmployeeHasPositions = {
          eHp_creates: newPosition,
          eHp_deletes: positionsToDelete,
        };

       */

        return payload;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }

  }


}