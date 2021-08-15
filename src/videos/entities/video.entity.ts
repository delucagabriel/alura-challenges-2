import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
}
