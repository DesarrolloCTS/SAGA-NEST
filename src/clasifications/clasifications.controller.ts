import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClasificationsService } from './clasifications.service';
import { CreateClasificationDto } from './dto/create-clasification.dto';
import { UpdateClasificationDto } from './dto/update-clasification.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class ClasificationsController {
  constructor(private readonly clasificationsService: ClasificationsService) {}

  @MessagePattern('createClasification')
  create(@Payload() createClasificationDto: CreateClasificationDto) {
    return this.clasificationsService.create(createClasificationDto);
  }

  @MessagePattern('findAllClasifications')
  findAll(@Payload() pagination: PaginationDto) {
    return this.clasificationsService.findAll(pagination);
  }

  @MessagePattern('findOneClasification')
  findOne(@Payload() { id }: { id: number }) {
    return this.clasificationsService.findOne(id);
  }

  @MessagePattern('updateClasification')
  update(@Payload() updateClasificationDto: UpdateClasificationDto) {
    return this.clasificationsService.update(
      
      updateClasificationDto,
    );
  }

  @MessagePattern('removeClasification')
  remove(@Payload() { id }: { id: number }) {
    return this.clasificationsService.remove(id);
  }
}
