import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from '../videos/entities/video.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  @InjectRepository(Categoria)
  private categoriaRepository: Repository<Categoria>;

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaRepository.save(createCategoriaDto);
  }

  findAll() {
    return this.categoriaRepository.find({
      relations: ['videos'],
      loadEagerRelations: true,
    });
  }

  findOne(id: number) {
    return this.categoriaRepository.findOne(id, {
      relations: ['videos'],
      loadEagerRelations: true,
    });
  }

  async findVideoByCategory(id: number): Promise<Video[]> {
    const categoria = await this.findOne(id);
    return categoria.videos;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaRepository.update(id, updateCategoriaDto);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return this.categoriaRepository.remove(categoria);
  }
}
