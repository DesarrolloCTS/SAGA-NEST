import { Injectable } from '@nestjs/common';
import { CreateAddRemoveDto } from './dto/create-add-remove.dto';
import { UpdateAddRemoveDto } from './dto/update-add-remove.dto';
import { createResult, deleteResult, ErrorManager, findOneByTerm, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult, runInTransaction } from 'src/common';
import { DataSource, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { addRemoval } from 'cts-entities';
import { InjectRepository } from '@nestjs/typeorm'


@Injectable()
export class AddRemoveService {
  constructor(
    @InjectRepository(addRemoval)
    private readonly addRemovalRepository: Repository<addRemoval>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createAddRemoveDto: CreateAddRemoveDto) {
    
    try { 
      return runInTransaction(this.dataSource, async (queryRunner) => {

        const { idIventory, type, ...rest } = createAddRemoveDto

        const addRemove = await createResult(
          this.addRemovalRepository,
          {
            ...createAddRemoveDto,
            type: createAddRemoveDto.type
          },
          addRemoval,
          queryRunner,
        )
        return addRemove
      }
      )
    }
    catch (error) {
      console.log(error);
    }
  }
  

  async findAll(
    pagination: PaginationRelationsDto
  ) {
    try {
      const options: FindManyOptions<addRemoval> = {};
      if (pagination.relations) {
        options.relations = {

        };
      }

      return await paginationResult(this.addRemovalRepository, {
        ...pagination,
        options,
      })
    } catch (error) {

    }
  }

  findOne(
    { term: id,
      relations = false,
    }: FindOneWhitTermAndRelationDto) {
    try {
      const options: FindOneOptions<addRemoval> = {};

      if (relations) {
        options.relations = {
          inventory: {
            resource: {
              clasification: true,
              model: true
            }
          },

        };
      }
      const result = findOneByTerm({
        repository: this.addRemovalRepository,
        term: id,
        options,
      });

      return result;

    } catch (error) {

    }
  }

  async update(updateAddRemoveDto: UpdateAddRemoveDto) {
    try {
      return await runInTransaction(this.dataSource, async (queryRunner) => {

      })
    } catch (error) {
      console.log(error);
    }
  } 

  remove(id: number) {
    try {
      return deleteResult(this.addRemovalRepository, id);
    }
    catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
}
