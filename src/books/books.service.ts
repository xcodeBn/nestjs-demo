import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

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

  create(book: {
    title: string;
    authorId: number;
    publisherId: number;
    genres: number[];
  }): Book {
    if (!book) {
      throw new BadRequestException(`Bad Request`);
    }
    //there's def a better way to do this, by using the dto i created however im too lazy
    // for now this satisfies requirements
    if (!book.title || !book.authorId || !book.publisherId) {
      throw new BadRequestException(`Bad Request`);
    }

    const newBook = {
      id: this.books[this.books.length - 1].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(
    id: number,
    book: { title: string; authorId: number; genres: number[] },
  ): Book {
    if (!id || !book) {
      throw new BadRequestException(`Bad Request`);
    }

    const bookToUpdateIndex = this.books.findIndex((book) => book.id === id);
    if (bookToUpdateIndex == -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return (this.books[bookToUpdateIndex] = {
      ...this.books[bookToUpdateIndex],
      ...book,
    });
  }
}
