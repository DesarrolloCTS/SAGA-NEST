import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { createResult, deleteResult, ErrorManager, findOneByTerm, PaginationDto, paginationResult, updateResult } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';
@Injectable()
export class StateService {

  constructor(
    @InjectRepository(State) private readonly stateRepository: Repository<State>
  ) { }

  create(createStateDto: CreateStateDto) {
    try {
      const result = createResult(this.stateRepository, createStateDto, State);
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      const result = await paginationResult(this.stateRepository, pagination);
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);

    }
  }

  findOne(id: number) {
    try {
      const result = findOneByTerm({
        repository: this.stateRepository,
        term: id,
      })
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);

    }
  }
  async update(updateStateDto: UpdateStateDto) {
    try {
      const { id, ...rest } = updateStateDto;
      const state = await this.findOne(id);
      Object.assign(state, rest);
      const result = await updateResult(this.stateRepository, id, state);
      return result;

    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try {

      return await deleteResult(this.stateRepository, id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
