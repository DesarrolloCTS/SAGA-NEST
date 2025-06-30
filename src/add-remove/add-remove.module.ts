import { Module } from '@nestjs/common';
import { AddRemoveService } from './add-remove.service';
import { AddRemoveController } from './add-remove.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addRemoval } from 'cts-entities';
import { InventoryModule } from 'src/inventory/inventory.module';
const entities = [addRemoval];
const servicesImport = [InventoryModule];
@Module({
  imports: [TypeOrmModule.forFeature(entities),...servicesImport ],
  controllers: [AddRemoveController],
  providers: [AddRemoveService],
  exports: [AddRemoveService],
})
export class AddRemoveModule {}
