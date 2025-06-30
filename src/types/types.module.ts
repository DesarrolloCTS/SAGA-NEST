import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypeDocumentEntity } from 'cts-entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDocumentEntity])],
  controllers: [TypesController],
  providers: [TypesService],
  exports: [TypesService]
})
  
export class TypesModule {}
