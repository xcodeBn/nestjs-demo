import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  private publishers: Publisher[] = [
    {
      id: 1,
      name: 'idk',
      about: 'haha ',
    },
    {
      id: 2,
      name: 'i do know',
      about: 'very famous ',
    },
    {
      id: 4,
      name: 'ea',
      about: 'soemthing',
    },
  ];

  create(createPublisherDto: CreatePublisherDto) {
    const id = this.publishers[this.publishers.length].id + 1;
    const newPublisher = { id, ...createPublisherDto };
    this.publishers.push(newPublisher);
    return newPublisher;
  }

  findAll() {
    return this.publishers;
  }

  findOne(id: number) {
    const publisher = this.publishers.find((p) => p.id === id);

    if (!publisher) {
      throw new NotFoundException('No publisher with id ' + id);
    }
    return publisher;
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    const index = this.publishers.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`No publisher with id ${id}`);
    }

    this.publishers[index] = {
      ...this.publishers[index],
      ...updatePublisherDto,
      id,
    };
    return this.publishers[index];
  }

  remove(id: number) {
    const index = this.publishers.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`No publisher with id ${id}`);
    }
    const deletedPublisher = this.publishers.splice(index, 1);
    return deletedPublisher[0];
  }
}
