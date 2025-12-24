import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book, BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // TODO: Implement book controller methods
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
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
