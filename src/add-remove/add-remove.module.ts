import { Module } from '@nestjs/common';
import { AddRemoveService } from './add-remove.service';
import { AddRemoveController } from './add-remove.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addRemoval, in } from 'cts-entities';
import { InventoryHasAddService } from './inventory-has-add/inventory-has-add.service';
const entities = [addRemoval];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AddRemoveController],
  providers: [AddRemoveService, InventoryHasAddService],
  exports: [AddRemoveService],
})
export class AddRemoveModule {}
