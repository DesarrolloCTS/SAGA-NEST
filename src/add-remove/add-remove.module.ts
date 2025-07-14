import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addRemoval } from 'cts-entities';

import { AddRemoveService } from './add-remove.service';
import { AddRemoveController } from './add-remove.controller';

const entities = [addRemoval];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AddRemoveController],
  providers: [AddRemoveService],
  exports: [AddRemoveService],
})
export class AddRemoveModule {}
