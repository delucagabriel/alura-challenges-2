import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { videosStub } from '../common/test/videos.stub';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        VideosService,
        {
          provide: VideosService,
          useValue: {
            create: jest.fn().mockResolvedValue(videosStub[0]),
            findAll: jest.fn().mockResolvedValue(videosStub),
            findOne: jest.fn().mockResolvedValue(videosStub[0]),
            update: jest.fn().mockResolvedValue(videosStub[0]),
            remove: jest.fn().mockResolvedValue(videosStub[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a video', async () => {
      const result = await service.create(videosStub[0]);
      expect(result).toEqual(videosStub[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      expect(service.create(videosStub[0])).rejects.toThrowError();
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a video list', async () => {
      const result = await service.findAll();
      expect(result).toEqual(videosStub);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(service.findAll()).rejects.toThrowError();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a video', async () => {
      const result = await service.findOne(videosStub[0].id);
      expect(result).toEqual(videosStub[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      expect(service.findOne(1)).rejects.toThrowError();
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a updated video', async () => {
      const result = await service.update(videosStub[0].id, videosStub[0]);
      expect(result).toEqual(videosStub[0]);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      expect(service.update(1, videosStub[0])).rejects.toThrowError();
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a removed video', async () => {
      const result = await service.remove(videosStub[0].id);
      expect(result).toEqual(videosStub[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      expect(service.remove(1)).rejects.toThrowError();
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
