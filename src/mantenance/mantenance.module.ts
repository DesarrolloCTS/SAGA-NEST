import { Module } from '@nestjs/common';
import { MantenanceService } from './mantenance.service';
import { MantenanceController } from './mantenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mantenance } from './entities/mantenance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mantenance])],
  controllers: [MantenanceController],
  providers: [MantenanceService],
  exports: [MantenanceService],
})
export class MantenanceModule {}
