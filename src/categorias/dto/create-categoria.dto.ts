import { Video } from '../../videos/entities/video.entity';

export class CreateCategoriaDto {
  id?: number;
  titulo: string;
  cor: string;
  videos: Video[];
}
