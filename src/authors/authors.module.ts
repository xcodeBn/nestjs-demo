import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { BooksModule } from '..//books/books.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [BooksModule],
})
export class AuthorsModule {}
