import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { categoriasStub } from '../common/test/categorias.stub';
import { Repository } from 'typeorm';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let repository: Repository<Categoria>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getRepositoryToken(Categoria),
          useValue: {
            save: jest.fn().mockResolvedValue(categoriasStub[0]),
            find: jest.fn().mockResolvedValue(categoriasStub),
            findOne: jest.fn().mockResolvedValue(categoriasStub[0]),
            update: jest.fn().mockResolvedValue(categoriasStub[0]),
            remove: jest.fn().mockResolvedValue(categoriasStub[0]),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    repository = module.get(getRepositoryToken(Categoria));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should create a category', async () => {
      const newCategory: Omit<Categoria, 'id'> = categoriasStub[0];

      const result = await service.create(newCategory);

      expect(result).toEqual(categoriasStub[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());
      expect(service.create(categoriasStub[0])).rejects.toThrowError();
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a categories list', async () => {
      const result = await service.findAll();
      expect(result).toEqual(categoriasStub);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());
      expect(service.findAll()).rejects.toThrowError();
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const result = await service.findOne(categoriasStub[0].id);
      expect(result).toEqual(categoriasStub[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());
      expect(service.findOne(1)).rejects.toThrowError();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a updated category', async () => {
      const result = await service.update(
        categoriasStub[0].id,
        categoriasStub[0],
      );
      expect(result).toEqual(categoriasStub[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error());
      expect(service.update(1, categoriasStub[0])).rejects.toThrowError();
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a removed category', async () => {
      const result = await service.remove(categoriasStub[0].id);
      expect(result).toEqual(categoriasStub[0]);
      expect(repository.remove).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'remove').mockRejectedValueOnce(new Error());
      expect(service.remove(1)).rejects.toThrowError();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
