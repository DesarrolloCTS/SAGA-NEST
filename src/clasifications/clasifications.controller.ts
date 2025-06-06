import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClasificationsService } from './clasifications.service';
import { CreateClasificationDto } from './dto/create-clasification.dto';
import { UpdateClasificationDto } from './dto/update-clasification.dto';

@Controller('clasifications')
export class ClasificationsController {
  constructor(private readonly clasificationsService: ClasificationsService) {}

  @Post()
  create(@Body() createClasificationDto: CreateClasificationDto) {
    return this.clasificationsService.create(createClasificationDto);
  }

  @Get()
  findAll() {
    return this.clasificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clasificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClasificationDto: UpdateClasificationDto) {
    return this.clasificationsService.update(+id, updateClasificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasificationsService.remove(+id);
  }
}
