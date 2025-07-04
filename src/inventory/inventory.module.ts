import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory, Ubications } from 'cts-entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesModule } from '../resources/resources.module';
import { AddRemoveModule } from '../add-remove/add-remove.module';
import { AdmissionsDischargesModule } from '../admissions-discharges/admissions-discharges.module';
import { MantenanceModule } from '../mantenance/mantenance.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { StateModule } from 'src/state/state.module';
import { UbicationsModule } from 'src/ubications/ubications.module';


@Module({
  imports: [UbicationsModule, StateModule, AssignmentsModule, MantenanceModule, ResourcesModule, AddRemoveModule, AdmissionsDischargesModule, TypeOrmModule.forFeature([Inventory])],  
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService]
})
export class InventoryModule {}
