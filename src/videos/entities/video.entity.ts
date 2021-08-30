import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  descricao: string;

  @IsNotEmpty()
  @IsUrl()
  @Column()
  url: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, { nullable: false })
  categoria: Categoria;

  constructor(private video?: Partial<Video>) {}
}
