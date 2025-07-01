import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from 'cts-entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([State])
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService]
})
export class StateModule {}
