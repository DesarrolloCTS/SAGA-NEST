import { Module } from '@nestjs/common';
import {ConfigModule} from  '@nestjs/config'
import { InventoriesModule } from './inventories/inventories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasificationsModule } from './clasifications/clasifications.module';

@Module({
  imports: [

    ConfigModule.forRoot(),
    InventoriesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: false,
    }),
    ClasificationsModule,
    
  ],
})
export class AppModule { }
