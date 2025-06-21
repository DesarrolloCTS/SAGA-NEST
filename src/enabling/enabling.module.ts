import { Module } from '@nestjs/common';
import { EnablingService } from './enabling.service';
import { EnablingController } from './enabling.controller';
import { TypesModule } from 'src/types/types.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habilitations } from 'cts-entities/src/entities/habilitations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habilitations]), TypesModule],
  controllers: [EnablingController],
  providers: [EnablingService],
  exports: [EnablingService],
})
export class EnablingModule {}
