import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        // return 'This will return all Movies';
        return this.moviesService.getAll();
    }

    // Get(('/id')) 가 위에있으면 다른 Get 작동하지 않음 
    // @Get('search')
    // search(@Query('year') searchingYear: string) {
    //     return `We are searching for a movie made after: ${searchingYear}`;
    // }

    @Get(':id')
    getOne(@Param("id") id: number): Movie {
        // return `This will return one Movie with the id : ${id}`;
        console.log(`type of movieid :: ${typeof id}`)
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        // return movieData;
        return this.moviesService.create(movieData);
    }

    @Delete(':id')
    delete(@Param('id') movieId: number) {
        // return `This will delete one Movie with the id : ${movieId}`;
        return this.moviesService.deleteOne(movieId);
    }

    // 리소스 일부만 업데이트 해줌 : Patch
    // 리소스 전체를 업데이트 해줌 : Put
    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        this.moviesService.update(movieId, updateData);
        // return {
        //     updateMovie: movieId,
        //     ...updateData,
        // };
    }
}
