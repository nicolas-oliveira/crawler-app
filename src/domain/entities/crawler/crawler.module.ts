import { Module } from '@nestjs/common';
import CrawlerService from './crawler.service';

@Module({
	imports: [
	],
	controllers: [
	],
	providers: [
		CrawlerService,
	],
})
export default class CrawlerModule { }
