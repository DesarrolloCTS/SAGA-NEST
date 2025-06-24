import { Module } from '@nestjs/common';
import { AdmissionsDischargesService } from './admissions-discharges.service';
import { AdmissionsDischargesController } from './admissions-discharges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admissionsDischarges } from 'cts-entities/src/entities/AdmissionsDischarge.entity';
import { TypesModule } from 'src/types/types.module';

@Module({
  imports: [TypesModule, TypeOrmModule.forFeature([admissionsDischarges])],
  controllers: [AdmissionsDischargesController],
  providers: [AdmissionsDischargesService],
  exports: [AdmissionsDischargesService],
})
export class AdmissionsDischargesModule {}
