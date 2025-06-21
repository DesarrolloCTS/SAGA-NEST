import { Injectable } from '@nestjs/common';
import { CreateMantenanceDto } from './dto/create-mantenance.dto';
import { UpdateMantenanceDto } from './dto/update-mantenance.dto';
import { Mantenance } from './entities/mantenance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createResult, deleteResult, ErrorManager, findOneByTerm, PaginationDto, paginationResult, updateResult } from 'src/common';

@Injectable()
  export class MantenanceService {
  constructor(@InjectRepository(Mantenance) private mantenanceRepository: Repository <Mantenance>){}
  async create(CreateMantenanceDto: CreateMantenanceDto) {
    try {
      const result = await createResult(this.mantenanceRepository, CreateMantenanceDto, Mantenance);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  findAll(pagination: PaginationDto) {
    try {
      const result = paginationResult(this.mantenanceRepository, pagination);
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  findOne(id: number) {
    try {
      const result = findOneByTerm({ repository: this.mantenanceRepository, term: id });
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(id: number, updateMantenanceDto: UpdateMantenanceDto) {
    try {
      const { id, ...res } = updateMantenanceDto;
      const mantenance = await findOneByTerm({ repository: this.mantenanceRepository, term: id });
      Object.assign(mantenance, res);
      const result = await updateResult(this.mantenanceRepository, id, mantenance);
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  } 

  remove(id: number) {
    try {
      return deleteResult(this.mantenanceRepository, id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
