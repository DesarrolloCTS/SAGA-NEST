import { Module } from '@nestjs/common';
import { ClasificationsService } from './clasifications.service';
import { ClasificationsController } from './clasifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classifications } from './entities/clasification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classifications])],
  exports: [TypeOrmModule],
  controllers: [ClasificationsController],
  providers: [ClasificationsService],
})
export class ClasificationsModule {}
