import { Injectable } from '@nestjs/common';
import { CreateClasificationDto } from './dto/create-clasification.dto';
import { UpdateClasificationDto } from './dto/update-clasification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classifications } from './entities/clasification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClasificationsService {

  constructor( 
    @InjectRepository(Classifications)
    private clasificationRepository: Repository<Classifications>
  ) {}
  findAll():Promise<Classifications[]> {
    return this.clasificationRepository.find();
  }
  create(createClasificationDto: CreateClasificationDto) {
    return 'This action adds a new clasification';
  }


  findOne(id: number) {
    return `This action returns a #${id} clasification`;
  }

  update(id: number, updateClasificationDto: UpdateClasificationDto) {
    return `This action updates a #${id} clasification`;
  }

  async remove(id: number):Promise<void> {
    await this.clasificationRepository.softDelete(id);
  }
}
