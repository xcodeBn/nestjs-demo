import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  @Get()
  findAll(
    @Query('includeAuthor', new DefaultValuePipe(false), ParseBoolPipe)
    includeAuthor?: boolean,
  ) {
    return this.booksService.findAll(includeAuthor);
  }

  @ApiOperation({ summary: 'Get a book by id' })
  @ApiResponse({ status: 200, description: 'Return the book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiParam({ name: 'id', description: 'The id of the book to get' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The id of the book to delete' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }

  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', description: 'The id of the book to update' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }
}
