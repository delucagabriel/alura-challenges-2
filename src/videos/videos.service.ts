import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  @InjectRepository(Video)
  private videoRepository: Repository<Video>;

  create(createVideoDto: CreateVideoDto) {
    if (!createVideoDto.categoria)
      return this.videoRepository.save({
        ...createVideoDto,
        categoria: { id: 1 },
      });
    return this.videoRepository.save(createVideoDto);
  }

  findAll(search = '') {
    return this.videoRepository.find({
      where: { titulo: ILike(`%${search}%`) },
      relations: ['categoria'],
    });
  }

  findOne(id: number) {
    return this.videoRepository.findOne(id);
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.videoRepository.update(id, updateVideoDto);
  }

  async remove(id: number) {
    const video = await this.findOne(id);
    return this.videoRepository.remove(video);
  }
}
