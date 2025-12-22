import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Post()
  create(@Body() author: { name: string; email: string }) {
    return author;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(+id, authorUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authorsService.delete(+id);
  }
}
