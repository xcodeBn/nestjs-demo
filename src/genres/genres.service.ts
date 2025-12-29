import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  genres: Genre[] = [
    {
      id: 1,
      name: 'fantasy',
    },
    {
      id: 2,
      name: 'action',
    },
    {
      id: 3,
      name: 'drama',
    },
    {
      id: 4,
      name: 'history',
    },
  ];

  create(createGenreDto: CreateGenreDto) {
    const id = this.genres[this.genres.length - 1].id + 1;
    const genre = {
      ...createGenreDto,
      id: id,
    };
    this.genres.push(genre);
    return genre;
  }

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((genre) => genre.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    return genre;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    const index = this.genres.findIndex((genre) => genre.id === id);
    if (index == -1) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    const updatedGenre = {
      id: id,
      ...updateGenreDto,
    };
    this.genres[index] = updatedGenre;
    return updatedGenre;
  }

  remove(id: number) {
    const index = this.genres.findIndex((genre) => genre.id === id);
    if (index == -1) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    this.genres.splice(index, 1);
    // as a note incase a genre got removed i should remove it from the book who has it too, but i didnt want to overcomplicate stuff uness required


    //idk how to return a no response ngl
    return `genre removed id:${id}`;
  }
}
