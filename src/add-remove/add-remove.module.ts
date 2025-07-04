import { Module } from '@nestjs/common';
import { AddRemoveService } from './add-remove.service';
import { AddRemoveController } from './add-remove.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addRemoval } from 'cts-entities';
const entities = [addRemoval];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AddRemoveController],
  providers: [AddRemoveService],
  exports: [AddRemoveService],
})
export class AddRemoveModule {}
