import { Inject, Injectable } from '@nestjs/common';
import { CreateEnablingDto } from './dto/create-enabling.dto';
import { UpdateEnablingDto } from './dto/update-enabling.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enabling } from './entities/enabling.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { createResult, ErrorManager, PaginationRelationsDto } from 'src/common';
import { Habilitations } from 'cts-entities';

@Injectable()
export class EnablingService {
  constructor(
    @InjectRepository(Habilitations) private readonly enablingRepository: Repository<Habilitations>,
  ) { }
  async create(createEnablingDto: CreateEnablingDto) {
    try {
      const result = await createResult(
        this.enablingRepository,
        {
          ...createEnablingDto,
        },
        Enabling
      );
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  findAll(pagination: PaginationRelationsDto) {
    try {
      const options: FindManyOptions<Enabling> = {}
      if (pagination.relations) options.relations = { state: true }
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
      
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} enabling`;
  }

  update(id: number, updateEnablingDto: UpdateEnablingDto) {
    return `This action updates a #${id} enabling`;
  }

  remove(id: number) {
    return `This action removes a #${id} enabling`;
  }
}
