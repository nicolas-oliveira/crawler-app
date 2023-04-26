import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export default class CrawlerService {
	page: Page
	
	async SetupPuppeteer(url: string): Promise<Page> {
		const browser = await puppeteer.launch({ headless: true, executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'], });
		try {
			const page = await browser.newPage();
			
			await page.goto(url);
		
			return page;
		} catch(error) {
			await browser.close();
			console.log("Error: crawler.service.ts");
			console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
