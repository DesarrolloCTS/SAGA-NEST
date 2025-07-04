import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory, Ubications } from 'cts-entities';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
import { ResourcesService } from 'src/resources/resources.service';
import { AddRemoveService } from 'src/add-remove/add-remove.service';
import { AdmissionsDischargesService } from 'src/admissions-discharges/admissions-discharges.service';
import { MantenanceService } from 'src/mantenance/mantenance.service';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { StateService } from 'src/state/state.service';
import { UbicationsService } from 'src/ubications/ubications.service';
import { aumentarStock, disminuirStock } from 'src/common/helpers/modifyStock';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)

    private readonly inventoryRepository: Repository<Inventory>,
    private readonly resourceServices: ResourcesService,
    private readonly addRemoveService: AddRemoveService,
    private readonly assigmentsServices: AssignmentsService,
    private readonly stateServices: StateService,
    private readonly admissionsDischargesService: AdmissionsDischargesService,
    private readonly mantenanceService: MantenanceService,
    private readonly ubicationsService: UbicationsService
  ) { }
  async create(createInventoryDto: CreateInventoryDto) {
    try {

      const {
        stateId,
        resourceId,
        addRemovalId,
        assignmentId,
        admissionsDischargesId,
        habilitationId,
        mantenanceId,
        user_id,
        ubications,
        ...CreateInventoryDto
      } = createInventoryDto;

      let stateExist,
        resourceExist,
        addRemovalExist,
        assignmentExist,
        admissionsDischargesExist,
        habilitationExist,
        ubicationExist,
        mantenanceExist;

      stateId
        ? (stateExist = await this.stateServices.findOne(
          createInventoryDto.stateId,
        ))
        : null;



      mantenanceId
        ? (mantenanceExist = await this.mantenanceService.findOne(
          mantenanceId,
        ))
        : null;

      resourceId
        ? (resourceExist = await this.resourceServices.findOne({
          term: createInventoryDto.resourceId,
        }))
        : null;

      addRemovalId
        ? (addRemovalExist = await this.addRemoveService.findOne({
          term: createInventoryDto.addRemovalId,
        }))
        : null;

      assignmentId
        ? (assignmentExist = await this.assigmentsServices.findOne({
          term: createInventoryDto.assignmentId,
        }))
        : null;

      admissionsDischargesId
        ? (admissionsDischargesExist =
          await this.admissionsDischargesService.findOne({
            term: createInventoryDto.admissionsDischargesId,
          }))
        : null;

      ubicationExist
        ? (ubicationExist = await this.ubicationsService.findOne(
          createInventoryDto.ubications,
        ))
        : null;


      const result = await createResult(
        this.inventoryRepository,
        {
          ...CreateInventoryDto,

          state: stateExist,
          resource: resourceExist,
          addRemoval: addRemovalExist,
          assignmentsReturns: assignmentExist,
          admissionsDischarges: admissionsDischargesExist,
          habilitations: habilitationExist,
          maintenances: mantenanceExist,
          ubications: ubicationExist

        },
        Inventory,
      );

      if (addRemovalExist?.type === 'ALTA') {
        await aumentarStock(resourceExist.id);
      } else if (addRemovalExist?.type === 'BAJA') {
        await disminuirStock(resourceExist.id);
      }

      return result;
    } catch (error) { }
  }

  async findAll(pagination: PaginationRelationsDto) {
    try {
      const option: FindManyOptions<Inventory> = {};
      if (pagination.relations)
        option.relations = {
          state: true,
          resource: {
            clasification: true,
            model: true,
          },
        };
      const result = await paginationResult(this.inventoryRepository, {
        ...pagination,
        options: option,
      });
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOne(id: FindOneWhitTermAndRelationDto) {
    try {
      const option: FindManyOptions<Inventory> = {};
      if (id.relations)
        option.relations = {
          state: true,
          resource: {
            clasification: true,
            model: true,
          },
        };
      const result = findOneByTerm({
        repository: this.inventoryRepository,
        term: id.term,
        options: option,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateInventoryDto: UpdateInventoryDto) {
    try {
      const { id, ...rest } = updateInventoryDto;
      const inventory = await findOneByTerm({
        repository: this.inventoryRepository,
        term: id,
      });
      Object.assign(inventory, rest);
      const result = await updateResult(
        this.inventoryRepository,
        id,
        inventory,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try {
      //Disminuir stock por cada item eliminado
      await disminuirStock(id);
      return await deleteResult(this.inventoryRepository, id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}

