import { Categoria } from '../../categorias/entities/categoria.entity';
import { Video } from '../../videos/entities/video.entity';
import { categoriasStub } from './categorias.stub';

export const videosStub: Video[] = [
  new Video({
    id: 1,
    titulo: 'título qualquer',
    descricao: 'descrição qualquer',
    url: 'http://url_qualquer.com',
    categoria: new Categoria({ id: 1, titulo: 'LIVRE', cor: 'verde' }),
  }),
  new Video({
    id: 2,
    titulo: 'outro título qualquer',
    descricao: 'outra descrição qualquer',
    url: 'http://outra_url_qualquer.com',
    categoria: categoriasStub[1],
  }),
  new Video({
    id: 3,
    titulo: 'titulo qualquer',
    descricao: 'descrição qualquer',
    url: 'http://url_qualquer.com',
    categoria: categoriasStub[1],
  }),
];
