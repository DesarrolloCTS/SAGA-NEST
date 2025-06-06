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
    try {
      const clasification = this.clasificationRepository.create(createClasificationDto);
      return this.clasificationRepository.save(clasification);
    } catch (error) {
      console.log(error);
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} clasification`;
  }

  update(id: number, updateClasificationDto: UpdateClasificationDto) {

    try {
      const clasification = this.clasificationRepository.create(updateClasificationDto);
      return this.clasificationRepository.update(id, clasification);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number):Promise<void> {
    try {
      await this.clasificationRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
