import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsReturns } from 'cts-entities';
import { InventoryModule } from '../inventory/inventory.module';
@Module({
  imports: [InventoryModule, TypeOrmModule.forFeature([AssignmentsReturns])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
exports: [AssignmentsService]
})
export class AssignmentsModule {}



