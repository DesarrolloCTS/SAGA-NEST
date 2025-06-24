import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory } from '../../../cts-entities/src/entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from 'src/state/state.module';
import { ResourcesModule } from '../resources/resources.module';


@Module({
  imports: [StateModule, ResourcesModule, TypeOrmModule.forFeature([Inventory])],  
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService]
})
export class InventoryModule {}
