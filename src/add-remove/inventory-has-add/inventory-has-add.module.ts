import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryHasAddRemoval } from 'cts-entities';

import { InventoryHasAddService } from './inventory-has-add.service';
import { ResourcesModule } from '../../resources/resources.module';
import { AddRemoveModule } from '../add-remove.module';
import { AddRemoveController } from './inventory-has-add.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryHasAddRemoval]),
    ResourcesModule,
    AddRemoveModule,
  ],
  controllers: [AddRemoveController],
  providers: [InventoryHasAddService],
  exports: [InventoryHasAddService],
})
export class InventoryHasAddModule {}
