import { Module } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { UbicationsController } from './ubications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubications } from 'cts-entities';
@Module({
  imports: [TypeOrmModule.forFeature([Ubications])],
  controllers: [UbicationsController],
  providers: [UbicationsService],
  exports: [UbicationsService],
})
export class UbicationsModule {}
