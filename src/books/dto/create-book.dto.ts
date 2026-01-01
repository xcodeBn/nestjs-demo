import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Hobbit',
  })
  @IsString()
  @IsNotEmpty({
    message: 'The title of the book cannot be empty',
  })
  title: string;

  @ApiProperty({
    description: 'The ID of the author of the book',
    example: 1,
  })
  @IsNotEmpty({
    message: "authorId can't be empty",
  })
  @IsInt()
  authorId: number;

  @ApiProperty({
    description: 'The ID of the publisher of the book',
    example: 1,
  })
  @IsNotEmpty({
    message: "publisherId can't be empty",
  })
  @IsInt()
  publisherId: number;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  genres: number[];
}
