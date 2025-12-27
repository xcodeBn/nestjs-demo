import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('books')
@Controller('books')
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
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The id of the book to delete' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.delete(+id);
  }

  @ApiOperation({ summary: 'Create a book' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        authorId: { type: 'string' },
        publisherId: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(
    @Body()
    book: {
      title: string;
      authorId: string;
      publisherId: string;
      genres: string[];
    },
  ) {
    return this.booksService.create({
      ...book,
      authorId: +book.authorId,
      publisherId: +book.publisherId,
      genres: book.genres.map((id) => {
        return +id;
      }),
    });
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        authorId: { type: 'string' },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'The id of the book to update' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() book: { title: string; authorId: string; genres: string[] },
  ) {
    return this.booksService.update(+id, {
      ...book,
      authorId: +book.authorId,
      genres: book.genres.map((id) => +id),
    });
  }
}
