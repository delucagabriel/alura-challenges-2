import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

  async findAll(search = '', options) {
    const skippedItems = (+options.page - 1) * +options.limit;
    const [result, total] = await this.videoRepository.findAndCount({
      skip: skippedItems,
      take: +options.limit,
      where: { titulo: ILike(`%${search}%`) },
      relations: ['categoria'],
    });

    return {
      data: result,
      totalCount: total,
      pages: Math.ceil(
        total / (+options.limit > total ? total : +options.limit),
      ),
      currentPage: +options.page || 1,
    };
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
