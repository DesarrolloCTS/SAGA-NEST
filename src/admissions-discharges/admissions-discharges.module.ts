import { Module } from '@nestjs/common';
import { AdmissionsDischargesService } from './admissions-discharges.service';
import { AdmissionsDischargesController } from './admissions-discharges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionsDischarge } from './entities/admissions-discharge.entity';
import { TypesModule } from 'src/types/types.module';

@Module({
  imports: [TypesModule, TypeOrmModule.forFeature([AdmissionsDischarge])],
  controllers: [AdmissionsDischargesController],
  providers: [AdmissionsDischargesService],
})
export class AdmissionsDischargesModule {}
