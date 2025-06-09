import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @MessagePattern('createBrand')
  create(@Payload() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @MessagePattern('findAllBrands')
  findAll(@Payload() pagination: PaginationDto) {
    return this.brandsService.findAll(pagination);
  }

  @MessagePattern('findOneBrand')
  findOne(@Payload() { id }: { id: number }) {
    return this.brandsService.findOne(id);
  }

  @MessagePattern('updateBrand')
  update(@Payload() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update( updateBrandDto);
  }

  @MessagePattern('removeBrand')
  remove(@Payload() { id }: { id: number }) {
    return this.brandsService.remove(id);
  }
}
