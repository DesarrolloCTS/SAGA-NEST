import { Module } from '@nestjs/common';
import {ConfigModule} from  '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClasificationsModule } from './clasifications/clasifications.module';
import { ModelsModule } from './models/models.module';
import { ConfigDataSource } from './common';
import { BrandsModule } from './brands/brands.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ConfigDataSource }),
    ConfigModule.forRoot(),
    ClasificationsModule,
    BrandsModule,
    ResourcesModule,
    ModelsModule,
  ],
})
export class AppModule { }
