import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  @Column()
  url: string;
}
