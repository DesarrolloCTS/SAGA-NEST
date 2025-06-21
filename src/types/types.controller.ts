import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @MessagePattern('createType')
  create(@Payload() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @MessagePattern('findAllTypes')
  findAll(@Payload()pagination: PaginationDto) {
    return this.typesService.findAll(pagination);
  }

  @MessagePattern('findOneType')
  findOne(@Payload(){id}: {id: number}) {
    return this.typesService.findOne(id);
  }

  @MessagePattern('updateType')
  update(@Payload() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(updateTypeDto);
  }

  @MessagePattern('removeType')
  remove(@Payload(){id}:{ id: number}) {
    return this.typesService.remove(id);
  }
}
