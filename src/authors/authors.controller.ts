import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'Return all authors.' })
  @Get()
  findAll() {
    return { authors: this.authorsService.findAll() };
  }

  @ApiOperation({ summary: 'Get an author by id' })
  @ApiResponse({ status: 200, description: 'Return the author.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @ApiParam({ name: 'id', description: 'The id of the author to get' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an author' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'George Orwell' },
        email: { type: 'string', example: 'george.orwell@example.com' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
  })
  @Post()
  create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'George Orwell' },
        email: { type: 'string', example: 'george.orwell@example.com' },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'The id of the author to update' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The id of the author to delete' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
