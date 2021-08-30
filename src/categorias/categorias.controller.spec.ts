import { Test, TestingModule } from '@nestjs/testing';
import { categoriasStub } from '../common/test/categorias.stub';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { videosStub } from '../common/test/videos.stub';

describe('CategoriasController', () => {
  let controller: CategoriasController;
  let service: CategoriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [
        CategoriasService,
        {
          provide: CategoriasService,
          useValue: {
            create: jest.fn().mockResolvedValue(categoriasStub[0]),
            findAll: jest.fn().mockResolvedValue(categoriasStub),
            findOne: jest.fn().mockResolvedValue(categoriasStub[0]),
            findVideoByCategory: jest.fn().mockResolvedValue(videosStub),
            update: jest.fn().mockResolvedValue(categoriasStub[0]),
            remove: jest.fn().mockResolvedValue(categoriasStub[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const result = await service.create(categoriasStub[0]);
      expect(result).toEqual(categoriasStub[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      expect(service.create(categoriasStub[0])).rejects.toThrowError();
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a category list', async () => {
      const result = await service.findAll();
      expect(result).toEqual(categoriasStub);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(service.findAll()).rejects.toThrowError();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const result = await service.findOne(categoriasStub[0].id);
      expect(result).toEqual(categoriasStub[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      expect(service.findOne(1)).rejects.toThrowError();
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findVideosByCategoryId', () => {
    it('should return videos from a category', async () => {
      const result = await service.findVideoByCategory(categoriasStub[0].id);
      expect(result).toEqual(videosStub);
      expect(service.findVideoByCategory).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(service, 'findVideoByCategory')
        .mockRejectedValueOnce(new Error());
      expect(service.findVideoByCategory(1)).rejects.toThrowError();
      expect(service.findVideoByCategory).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a updated category', async () => {
      const result = await service.update(
        categoriasStub[0].id,
        categoriasStub[0],
      );
      expect(result).toEqual(categoriasStub[0]);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      expect(service.update(1, categoriasStub[0])).rejects.toThrowError();
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a removed category', async () => {
      const result = await service.remove(categoriasStub[0].id);
      expect(result).toEqual(categoriasStub[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      expect(service.remove(1)).rejects.toThrowError();
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
