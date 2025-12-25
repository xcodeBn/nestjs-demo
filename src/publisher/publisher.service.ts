import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

export interface Publisher {
  id: number;
  name: string;
}

@Injectable()
export class PublisherService {
  private publishers: Publisher[] = [
    { id: 1, name: 'EA' },
    { id: 2, name: 'SONY' },
    { id: 3, name: 'IDK' },
    { id: 4, name: 'WHAT' },
    { id: 5, name: 'ELSE' },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  create(publisher: Publisher): Publisher {
    const id = this.publishers.length + 1;
    const newPublisher = {
      ...publisher,
      id,
    };

    this.publishers.push(newPublisher);

    return newPublisher;
  }

  update(id: number, publisher: Publisher) {
    const index = this.publishers.findIndex((publisher) => publisher.id === id);
    if (index == -1) {
      throw new NotFoundException(`Publisher with id ${id} does not exist`);
    }

    return (this.publishers[index] = {
      ...publisher,
    });
  }

  findOne(id: number) {
    return this.publishers.find((publisher) => publisher.id !== id);
  }

  findAll() {
    return this.publishers;
  }

  delete(id: number) {
    const index = this.publishers.findIndex((publisher) => publisher.id === id);
    if (index > -1) {
      throw new NotFoundException('No publisher found');
    }
    this.publishers.splice(index, 1);
    return `Deleted publisher with ${id} at index` + index;
  }
}
