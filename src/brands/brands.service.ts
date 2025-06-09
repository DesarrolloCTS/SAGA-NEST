import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import {
  createResult,
  deleteResult,
  ErrorManager,
  findOneByTerm,
  PaginationDto,
  paginationResult,
  updateResult,
} from 'src/common';
import { asyncWrapProviders } from 'async_hooks';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    try {
      const result = await createResult(
        this.brandRepository,
        createBrandDto,
        Brand,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      const result = await paginationResult(this.brandRepository, pagination);
      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await findOneByTerm({ repository: this.brandRepository, term: id });
      return result;
    }catch(error){
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async update(updateBrandDto: UpdateBrandDto) {
    try {
      const { id, ...res } = updateBrandDto;
      const brand = await this.findOne(id);
      Object.assign(brand, res);
      const result = await updateResult(this.brandRepository, id, brand);
      return result;
    }catch(error){
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }

  async remove(id: number) {
    try {
      return await deleteResult(this.brandRepository, id);
    }catch(error){
      console.log(error);
      throw ErrorManager.createSignatureError(error);
    }
  }
}
