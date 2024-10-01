import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CrawlerModule from '../domain/entities/crawler/crawler.module';
import CrawlerService from '../domain/entities/crawler/crawler.service';

@Module({
  imports: [CrawlerModule],
  controllers: [AppController],
  providers: [AppService, CrawlerService ],
})
export class AppModule {}
