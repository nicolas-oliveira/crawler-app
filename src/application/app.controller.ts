import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

import Room from './dtos/room.dto';
import SearchDateRequestDTO from './dtos/searchdaterequest.dto';

type SearchResponse = Room[];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

	@Post('/search')
  public async search(
		@Body()
		body: SearchDateRequestDTO
	): Promise<SearchResponse> {
		console.log(body)
		const { checkin, checkout } = body;
		
		return this.appService.searchForOffers({ checkin, checkout });
  }
}
