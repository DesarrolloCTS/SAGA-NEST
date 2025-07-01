import { Module } from '@nestjs/common';
import {ConfigModule} from  '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasificationsModule } from './clasifications/clasifications.module';
import { ModelsModule } from './models/models.module';
import { BrandsModule } from './brands/brands.module';
import { ResourcesModule } from './resources/resources.module';
import { EnablingModule } from './enabling/enabling.module';
import { MantenanceModule } from './mantenance/mantenance.module';
import { AddRemoveModule } from './add-remove/add-remove.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ConfigDataSource } from 'cts-entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ConfigDataSource as any }),
    ClasificationsModule,
    BrandsModule,
    ResourcesModule,
    ModelsModule,
    EnablingModule,
    MantenanceModule,
    AddRemoveModule,
    AssignmentsModule
  ],
})
export class AppModule { }
