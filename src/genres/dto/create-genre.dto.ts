import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Fantasy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
