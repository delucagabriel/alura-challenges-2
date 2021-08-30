import { IsNotEmpty, IsString } from 'class-validator';
import { Video } from '../../videos/entities/video.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  cor: string;

  @OneToMany(() => Video, (video) => video.categoria)
  videos: Video[];

  constructor(private categoria?: Partial<Categoria>) {}
}
