import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PaginationDto } from 'src/common';



@Controller()
export class StateController {
  constructor(
    private readonly stateService: StateService
  ) { }

  @MessagePattern('createState')
  async create(@Payload() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @MessagePattern('findAllState')
  findAll(@Payload() pagination: PaginationDto) {
    return this.stateService.findAll(pagination);
  }

  @MessagePattern('findOneState')
  findOne(@Payload() { id }: { id: number }) {
    return this.stateService.findOne(id);
  }

  @MessagePattern('updateState')
  update(@Payload() updateStateDto: UpdateStateDto) {
    return this.stateService.update(updateStateDto);
  }

  @MessagePattern('removeState')
    /**
     * Removes a state record by its ID.
     * @param {Object} id - The ID of the state to be removed.
     * @returns {Promise<any>} The result of the remove operation.
     */

  remove(@Payload() { id }: { id: number }) {
    return this.stateService.remove(id);
  }
}
