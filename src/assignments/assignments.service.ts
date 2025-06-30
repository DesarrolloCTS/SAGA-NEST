import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { createResult, deleteResult, ErrorManager, findOneByTerm, FindOneWhitTermAndRelationDto, PaginationRelationsDto, paginationResult, runInTransaction, updateResult } from 'src/common';
import { AssignmentsReturns as Assignments } from 'cts-entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignments)
    private readonly assignmentsRepository: Repository<Assignments>,
    private readonly dataSource: DataSource,
    private readonly InventoryService: InventoryService
  ) {}
  create(createAssignmentDto: CreateAssignmentDto) {
    try {
      return runInTransaction(this.dataSource, async (manager) => {
        const { name, date, hours } = createAssignmentDto;
        
        const assigments=await createResult(
          this.assignmentsRepository,
          {
            name,
            date,
            hours
          },
          Assignments
        )
        return assigments

      })
    }catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error); 
    }
  }

  findAll(pagination: PaginationRelationsDto) {
    try {
      const options: FindManyOptions<Assignments> = {};
      if (pagination.relations) options.relations = {
        inventory: {
          resource: {
            clasification: true,
            model: true
          }
        }
       
      };
      const result = paginationResult(this.assignmentsRepository, {
        ...pagination,
        options
      })
      return result
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  findOne({ term: id, relations }: FindOneWhitTermAndRelationDto) {
    try {
      const options: FindOneOptions<Assignments> = {};
      if (relations) options.relations = {
        inventory: {
          resource: {
            clasification: true,
            model: true
          }
        }}
      
      const result = findOneByTerm({
        repository: this.assignmentsRepository,
        term: id,
        options,
      });
      return result;

    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);   
    
    }
  }

  update( updateAssignmentDto: UpdateAssignmentDto) {
    try {
      const { id,...res } = updateAssignmentDto;
      return runInTransaction(this.dataSource, async (manager) =>{
        const resource = await findOneByTerm({
          repository: this.assignmentsRepository,
          term: id,
        });
        const result = await updateResult(
          this.assignmentsRepository,
          id,
          resource
        )
        await this.InventoryService.update(resource)
        return result;
      })
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
      
    }
  }

  remove(id: number) {
    try {
      return deleteResult(this.assignmentsRepository, id);
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
}
