import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

export interface Book {
  id: number;
  title: string;
  authorId: number;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Hobbit',
      authorId: 1,
    },
    {
      id: 2,
      title: 'The Fellowship of the Ring',
      authorId: 1,
    },
    {
      id: 3,
      title: 'The Two Towers',
      authorId: 1,
    },
    {
      id: 4,
      title: 'The Return of the King',
      authorId: 1,
    },
    {
      id: 5,
      title: 'The Colour of Magic',
      authorId: 2,
    },
    {
      id: 6,
      title: 'The Light Fantastic',
      authorId: 2,
    },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
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

  create(book: { title: string; authorId: number }) {
    const newBook = {
      id: this.books.length + 1,
      ...book,
    };
    this.books.push(newBook);
  }

  update(id: number, book: { title: string; authorId: number }) {
    const bookToUpdateIndex = this.books.findIndex((book) => book.id === id);
    if (!bookToUpdateIndex || bookToUpdateIndex == -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return (this.books[bookToUpdateIndex] = {
      ...this.books[bookToUpdateIndex],
      ...book,
    });
  }
}
