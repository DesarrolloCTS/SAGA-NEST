import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryHasAddService} from './inventory-has-add/inventory-has-add.service';
import { CreateHasAddRemoveDto}  from './inventory-has-add/dto/create-inventory-has-add-remove.dto';
import { FindOneWhitTermAndRelationDto } from 'src/common';

@Controller()
export class AddRemoveController {
  constructor(private readonly addRemoveService: InventoryHasAddService) {}

  @MessagePattern('createInventoryHasAdd')
  create(@Payload() createAddRemoveDto: CreateHasAddRemoveDto) {
    return this.addRemoveService.create(createAddRemoveDto);
  }

  @MessagePattern('findOneInventoryHasAdd')
  findOne(@Payload() findOne: FindOneWhitTermAndRelationDto) {
    return this.addRemoveService.findOneByActa(findOne);
  }

 
  @MessagePattern('removeInventoryHasAdd')
  remove(@Payload() { id }: { id: number }) {
    return this.addRemoveService.deletePositions(id);
  }
}
