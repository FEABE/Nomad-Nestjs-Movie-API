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
    describe('deleteOne()',()=>{
      it('deletes a movie', ()=>{
        service.create({
          title: "testmovie",
          genres:['test'],
          year: 2000,
        })
       const allMovies =service.getAll();
        service.remove(1)
        const afterDelete = service.getAll();
        console.log(service.getAll())
        expect(afterDelete.length).toEqual(allMovies.length -1)
      })
      it('should be return 404 error',()=>{
        try {
          service.remove(999)
        }catch(error){
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Movie with ID: 999 not found`)
        }
      })
      describe('this will return create method',()=>{
        it('will be return create data ',()=>{
          const berforecreate = service.getAll().length
          service.create({
            title: "testmovie",
            genres:['test'],
            year: 2000,
          })
          const aftercreate = service.getAll().length
          expect(aftercreate).toBeGreaterThan(berforecreate)
        })
      })
      describe('this is update method test ',()=>{
        it('will be return update data ', ()=>{
          service.create({
            title: "testmovie",
            genres:['test'],
            year: 2000,
          })
          service.update(1 ,{title:'awesome movie',year:5000})
        })
        const movie = service.getOne(1);
        expect(movie.title).toEqual('awesome movie')
      })
    })
  })
});
