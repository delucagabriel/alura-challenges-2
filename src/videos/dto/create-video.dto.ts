import { Categoria } from '../../categorias/entities/categoria.entity';

export class CreateVideoDto {
  id?: number;
  titulo: string;
  descricao: string;
  url: string;
  categoria: Categoria;
}
