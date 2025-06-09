import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClasificationsService } from './clasifications.service';
import { ClasificationsController } from './clasifications.controller';

import { Clasification } from './entities/clasification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clasification])],
  controllers: [ClasificationsController],
  providers: [ClasificationsService],
  exports: [ClasificationsService]
})
export class ClasificationsModule {}
