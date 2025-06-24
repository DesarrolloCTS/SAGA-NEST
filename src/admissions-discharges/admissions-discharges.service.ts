import { Injectable } from '@nestjs/common';
import { CreateAdmissionsDischargeDto } from './dto/create-admissions-discharge.dto';
import { UpdateAdmissionsDischargeDto } from './dto/update-admissions-discharge.dto';
import { InjectRepository } from '@nestjs/typeorm';

//TODO:CAMBIAR A CTS-ENTITIES
import { AdmissionsDischarge } from 'cts-entities/src/entities/addRemove.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { TypesService } from 'src/types/types.service';
import { createResult, deleteResult, ErrorManager, findOneByTerm, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult, updateResult } from 'src/common';

@Injectable()
export class AdmissionsDischargesService {
  constructor(
    @InjectRepository(AdmissionsDischarge)
    private readonly admissionsDischargeRepository: Repository<AdmissionsDischarge>,
    private readonly typesService: TypesService
  ) { }
  async create(createAdmissionsDischargeDto: CreateAdmissionsDischargeDto) {
    try {
      const typeExist = await this.typesService.findOne(createAdmissionsDischargeDto.typeId);
      const result = await createResult(
        this.admissionsDischargeRepository,
        {
          ...createAdmissionsDischargeDto, types: typeExist
        },
        AdmissionsDischarge
      );
      return result
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findAll(pagination: PaginationRelationsDto) {
    try {
      const option: FindManyOptions<AdmissionsDischarge> = {};
      if (pagination.relations) option.relations = { types: true };
      const result = await paginationResult(this.admissionsDischargeRepository, {
        ...pagination,
        options: option,
      });
      return result;
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOne(id: FindOneWhitTermAndRelationDto) {
    try {
      const option: FindManyOptions<AdmissionsDischarge> = {}
      if (id.relations) option.relations = { types: true }
      const result = findOneByTerm({
        repository: this.admissionsDischargeRepository,
        term: id.term,
        options: option
      })
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(UpdateAdmissionsDischargeDto: UpdateAdmissionsDischargeDto) {
    try {
      const { id, ...res } = UpdateAdmissionsDischargeDto
      const admissionsDischargeExist = await findOneByTerm({
        repository: this.admissionsDischargeRepository,
        term: id
      });
      Object.assign(admissionsDischargeExist, res);

      const result = await updateResult(this.admissionsDischargeRepository, id, admissionsDischargeExist)
      return result
    } catch (error) {

    }
  }

  remove(id: number) {
    try {
      return deleteResult(this.admissionsDischargeRepository, id)
    }
    catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
