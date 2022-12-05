import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll()', () => {
    it('should return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getone()', () => {

    it('should return movie',()=>{
      service.create({
        title: "testmovie",
        genres:['test'],
        year: 2000,
      })
      const movie = service.getOne(1)
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it('should be error',()=>{
      try{
        service.getOne(999)
      }catch(error){
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Movie with ID: 999 not found`)
      }
    })
  })
});
