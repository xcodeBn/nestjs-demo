import { IsNotEmpty } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty({ message: "name can't be empty" })
  name: string;
  about?: string;
}
