import { Module } from '@nestjs/common';
import { InventoryHasAddService } from './inventory-has-add.service';
import { InventoryHasAddController } from './inventory-has-add.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryHasAdd } from './entities/inventory-has-add.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryHasAdd])],
  controllers: [InventoryHasAddController],
  providers: [InventoryHasAddService],
  exports: [InventoryHasAddService],
})
export class InventoryHasAddModule {}
