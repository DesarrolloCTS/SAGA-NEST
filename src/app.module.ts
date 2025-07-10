import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDataSource } from 'cts-entities';

import { ClasificationsModule } from './clasifications/clasifications.module';
import { ModelsModule } from './models/models.module';
import { BrandsModule } from './brands/brands.module';
import { ResourcesModule } from './resources/resources.module';
import { EnablingModule } from './enabling/enabling.module';
import { MantenanceModule } from './mantenance/mantenance.module';
import { AddRemoveModule } from './add-remove/add-remove.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AdmissionsDischargesModule } from './admissions-discharges/admissions-discharges.module';
import { InventoryModule } from './inventory/inventory.module';
import { UbicationsModule } from './ubications/ubications.module';
import { InventoryHasAddModule } from './inventory-has-add/inventory-has-add.module';
import { InventoryHasAssigmentModule } from './inventory-has-assigment/inventory-has-assigment.module';
import { InventoryHasAddModule } from './inventory-has-add/inventory-has-add.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ConfigDataSource }),
    ClasificationsModule,
    BrandsModule,
    ResourcesModule,
    ModelsModule,
    EnablingModule,
    MantenanceModule,
    AddRemoveModule,
    AssignmentsModule,
    InventoryModule,
    AdmissionsDischargesModule,
    MantenanceModule,
    UbicationsModule,
    InventoryHasAddModule,
    InventoryHasAssigmentModule,

  ],
})
export class AppModule {}
