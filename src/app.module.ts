import { Module } from '@nestjs/common';
import {ConfigModule} from  '@nestjs/config'
import { InventoriesModule } from './inventories/inventories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasificationsModule } from './clasifications/clasifications.module';
import { ConfigDataSource } from './common';

@Module({
  imports: [

    TypeOrmModule.forRoot({ ...ConfigDataSource }),
    ConfigModule.forRoot(),
    InventoriesModule,
    ClasificationsModule,
    
  ],
})
export class AppModule { }
