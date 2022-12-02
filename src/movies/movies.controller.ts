import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/movies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }
  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateData) {
    return this.moviesService.update(id, updateData);
  }
}
