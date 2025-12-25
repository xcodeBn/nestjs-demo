import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  controllers: [PublisherController],
  providers: [PublisherService],
  imports: [AuthorsModule],
})
export class PublisherModule {}
