import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { BrandsModule } from 'src/brands/brands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'cts-entities';

@Module({
  imports: [BrandsModule, TypeOrmModule.forFeature([Model])],
  controllers: [ModelsController],
  providers: [ModelsService],
  exports: [ModelsService],
})
export class ModelsModule {}
