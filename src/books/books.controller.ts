import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('includeAuthor') includeAuthor?: boolean) {
    return this.booksService.findAll(includeAuthor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.delete(+id);
  }

  @Post()
  create(@Body() book: { title: string; authorId: string }) {
    return this.booksService.create({
      ...book,
      authorId: +book.authorId,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() book: { title: string; authorId: string },
  ) {
    return this.booksService.update(+id, {
      ...book,
      authorId: +book.authorId,
    });
  }
}
