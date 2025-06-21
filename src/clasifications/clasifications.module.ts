import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClasificationsService } from './clasifications.service';
import { ClasificationsController } from './clasifications.controller';
//TODO: importar la entidad
import { Clasification } from '../../../cts-entities/src/entities/clasification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clasification])],
  controllers: [ClasificationsController],
  providers: [ClasificationsService],
  exports: [ClasificationsService]
})
export class ClasificationsModule {}
