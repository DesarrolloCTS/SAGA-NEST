import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { createResult, deleteResult, ErrorManager, findOneByTerm, PaginationDto, paginationResult, updateResult } from 'src/common';

@Injectable()
export class TypesService {
  constructor(@InjectRepository(Type) private typeRepository: Repository<Type>) { }

  async create(createTypeDto: CreateTypeDto) {
    try {
      const result = await createResult(this.typeRepository, createTypeDto, Type);
      return result
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      const result = await paginationResult(this.typeRepository, pagination)
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await findOneByTerm({
        repository: this.typeRepository,
        term: id,
      })
      return result
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateTypeDto: UpdateTypeDto) {
    try {
      const { id, ...res } = updateTypeDto
      const typeExits = await findOneByTerm({
        repository: this.typeRepository,
        term: id
      });
      const result = updateResult(this.typeRepository, id, typeExits)
      return result
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try {
      return await deleteResult(this.typeRepository, id)
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
