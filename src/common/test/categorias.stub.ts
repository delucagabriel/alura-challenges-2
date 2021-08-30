import { Categoria } from '../../categorias/entities/categoria.entity';

export const categoriasStub: Categoria[] = [
  new Categoria({ id: 1, titulo: 'LIVRE', cor: 'verde' }),
  new Categoria({ id: 2, titulo: 'Programação', cor: 'azul' }),
];
