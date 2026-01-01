import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('genres')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({ summary: 'Create a genre' })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'Return all genres.' })
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @ApiOperation({ summary: 'Get a genre by id' })
  @ApiResponse({ status: 200, description: 'Return the genre.' })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  @ApiParam({ name: 'id', description: 'The id of the genre to get' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a genre' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  @ApiParam({ name: 'id', description: 'The id of the genre to update' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genresService.update(id, updateGenreDto);
  }

  @ApiOperation({ summary: 'Delete a genre' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The id of the genre to delete' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.remove(id);
  }
}
