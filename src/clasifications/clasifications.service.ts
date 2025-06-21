import { Injectable } from '@nestjs/common';
import { CreateClasificationDto } from './dto/create-clasification.dto';
import { UpdateClasificationDto } from './dto/update-clasification.dto';
import { createResult, deleteResult, ErrorManager, findOneByTerm, PaginationDto, paginationResult, updateResult } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';

//TODO: CAMBIAR A CTS-ENTITIES
import { Clasification } from '../../../cts-entities/src/entities/clasification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClasificationsService {

  constructor(@InjectRepository(Clasification) private clasificationRepository: Repository<Clasification>) { }


  async create(createClasificationDto: CreateClasificationDto) {
   try {
     const result = await createResult(this.clasificationRepository, createClasificationDto, Clasification);
     return result;
   } catch (error) {
    throw ErrorManager.createSignatureError(error);
   }
  }

  findAll(pagination: PaginationDto) {
    try{
      const result = paginationResult(this.clasificationRepository, pagination);
      return result;   
    }catch(error){
      throw ErrorManager.createSignatureError(error);
    }
  }

  findOne(id: number) {
    try { 
      const result = findOneByTerm({ repository: this.clasificationRepository, term: id });
      return result;
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateClasificationDto: UpdateClasificationDto) {
    try { 
      const { id, ...res } = updateClasificationDto;
      const clasification = await findOneByTerm({ repository: this.clasificationRepository, term: id });
      Object.assign(clasification, res);
      const result = await updateResult(this.clasificationRepository, id, clasification);
      return result;
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try { 
      return await deleteResult(this.clasificationRepository, id);
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
