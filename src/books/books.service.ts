import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export class Book {
  id: number;
  title: string;
  authorId: number;
  publisherId: number;
  genres: number[];
}

// TODO migrate to dtos
@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Hobbit',
      authorId: 1,
      publisherId: 1,
      genres: [1, 2],
    },
    {
      id: 2,
      title: 'The Fellowship of the Ring',
      authorId: 1,
      publisherId: 1,
      genres: [1, 2],
    },
    {
      id: 3,
      title: 'The Two Towers',
      authorId: 1,
      publisherId: 1,
      genres: [1, 2],
    },
    {
      id: 4,
      title: 'The Return of the King',
      authorId: 1,
      publisherId: 1,
      genres: [1, 2],
    },
    {
      id: 5,
      title: 'The Colour of Magic',
      authorId: 2,
      publisherId: 1,
      genres: [1, 2],
    },
    {
      id: 6,
      title: 'The Light Fantastic',
      authorId: 2,
      publisherId: 1,
      genres: [1, 2],
    },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  findAll(withAuthorDetails: boolean = false) {
    if (withAuthorDetails) {
      return this.books.map((book) => {
        const { authorId, ...rest } = book;
        return {
          ...rest,
          author: this.authorsService.findOne(authorId),
        };
      });
    }
    return this.books;
  }

  findOne(id: number, withAuthorDetails: boolean = false) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (withAuthorDetails) {
      const { authorId, ...rest } = book;
      return {
        ...rest,
        author: this.authorsService.findOne(authorId),
      };
    }
    return book;
  }

  delete(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(this.books.indexOf(book), 1);
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook = {
      id: this.books[this.books.length - 1].id + 1,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const bookToUpdateIndex = this.books.findIndex((book) => book.id === id);
    if (bookToUpdateIndex == -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return (this.books[bookToUpdateIndex] = {
      ...this.books[bookToUpdateIndex],
      ...updateBookDto,
    });
  }
}
