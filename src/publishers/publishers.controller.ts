import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('publishers')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @ApiOperation({ summary: 'Create a publisher' })
  @ApiResponse({
    status: 201,
    description: 'The publisher has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @ApiOperation({ summary: 'Get all publishers' })
  @ApiResponse({ status: 200, description: 'Return all publishers.' })
  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @ApiOperation({ summary: 'Get a publisher by id' })
  @ApiResponse({ status: 200, description: 'Return the publisher.' })
  @ApiResponse({ status: 404, description: 'Publisher not found.' })
  @ApiParam({ name: 'id', description: 'The id of the publisher to get' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a publisher' })
  @ApiResponse({
    status: 200,
    description: 'The publisher has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Publisher not found.' })
  @ApiParam({ name: 'id', description: 'The id of the publisher to update' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @ApiOperation({ summary: 'Delete a publisher' })
  @ApiResponse({
    status: 200,
    description: 'The publisher has been successfully deleted.',
  })
  @ApiParam({ name: 'id', description: 'The id of the publisher to delete' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.remove(id);
  }
}
