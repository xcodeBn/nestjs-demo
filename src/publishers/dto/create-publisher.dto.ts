import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({
    description: 'The name of the publisher',
    example: 'Penguin Books',
  })
  @IsString()
  @IsNotEmpty({ message: "name can't be empty" })
  name: string;

  @ApiProperty({
    description: 'A brief description of the publisher',
    example: 'A famous publishing house.',
    required: false,
  })
  @IsString()
  @IsOptional()
  about?: string;
}
