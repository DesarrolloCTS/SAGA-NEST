import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeORMError } from 'typeorm';
import { Inventory } from '../Entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [StateModule, TypeOrmModule.forFeature([Inventory])],  
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService]
})
export class InventoryModule {}
