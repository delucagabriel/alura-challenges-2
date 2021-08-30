import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { videosStub } from '../common/test/videos.stub';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;
  let repository: Repository<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: getRepositoryToken(Video),
          useValue: {
            save: jest.fn().mockResolvedValue(videosStub[0]),
            find: jest.fn().mockResolvedValue(videosStub),
            findOne: jest.fn().mockResolvedValue(videosStub[0]),
            update: jest.fn().mockResolvedValue(videosStub[0]),
            remove: jest.fn().mockResolvedValue(videosStub[0]),
          },
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    repository = module.get(getRepositoryToken(Video));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    const newVideo: Omit<Video, 'id'> = videosStub[0];

    it('should create a video', async () => {
      const result = await service.create(newVideo);
      expect(result).toEqual(videosStub[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());
      expect(service.create(videosStub[0])).rejects.toThrowError();
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a videos list if search is not informed', async () => {
      const result = await service.findAll();
      expect(result).toEqual(videosStub);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return a videos list if search is informed', async () => {
      //Arrange
      const expectedResult = videosStub.filter((video) =>
        video.titulo?.includes('teste'),
      );
      jest.spyOn(repository, 'find').mockResolvedValue(expectedResult);

      //Act
      const result = await service.findAll('teste');

      //Assert
      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());
      expect(service.findAll()).rejects.toThrowError();
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a video', async () => {
      const result = await service.findOne(videosStub[0].id);
      expect(result).toEqual(videosStub[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());
      expect(service.findOne(1)).rejects.toThrowError();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a updated video', async () => {
      const result = await service.update(videosStub[0].id, videosStub[0]);
      expect(result).toEqual(videosStub[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error());
      expect(service.update(1, videosStub[0])).rejects.toThrowError();
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a removed video', async () => {
      const result = await service.remove(videosStub[0].id);
      expect(result).toEqual(videosStub[0]);
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
