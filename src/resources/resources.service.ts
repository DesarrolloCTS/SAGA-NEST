import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {
  createResult,
  deleteResult,
  ErrorManager,
  findOneByTerm,
  FindOneWhitTermAndRelationDto,
  PaginationRelationsDto,
  paginationResult,
  updateResult,
} from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ClasificationsService } from 'src/clasifications/clasifications.service';
import { ModelsService } from 'src/models/models.service';
import { Resource } from 'cts-entities';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private readonly clasificationsService: ClasificationsService,
    private readonly modelsService: ModelsService,
  ) {}
  async create(createResourceDto: CreateResourceDto) {
    try {
      const claExist = await this.clasificationsService.findOne(
        createResourceDto.clasificationId,
      );

      const modelExist = await this.modelsService.findOne({
        term: createResourceDto.modelId
      });

      const result = await createResult(
        this.resourceRepository,
        { ...createResourceDto, clasification: claExist, model: modelExist },
        Resource,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  findAll(pagination: PaginationRelationsDto) {
    try {
      const option: FindManyOptions<Resource> = {};
      if (pagination.relations)
        option.relations = { clasification: true, model: true };
      const result = paginationResult(this.resourceRepository, {
        ...pagination,
        options: option,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  findOne({ term: id, relations }: FindOneWhitTermAndRelationDto) {
    try {
      const options: FindOneOptions<Resource> = {};

      if (relations) options.relations = { clasification: true, model: true };

      const result = findOneByTerm({
        repository: this.resourceRepository,
        term: id,
        options,
      });

      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateResourceDto: UpdateResourceDto) {
    try {
      const { id, ...res } = updateResourceDto;
      const resource = await this.findOne({ term: id, relations: true });

      if (res.modelId && res.modelId !== resource.model.id) {
        const modelExist = await this.modelsService.findOne({
          term: res.modelId,
        });
        resource.model = modelExist;
      }
      if (res.clasificationId && res.clasificationId !== resource.clasification.id) {
        const claExist = await this.clasificationsService.findOne(
          res.clasificationId,
        );
        resource.clasification = claExist;
      }
      Object.assign(resource, res);
      const result = await updateResult(this.resourceRepository, id, resource);
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  remove(id: number) {
    try {
      return deleteResult(this.resourceRepository, id);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
}
