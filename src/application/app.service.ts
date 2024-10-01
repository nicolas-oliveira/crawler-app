import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CrawlerService from '../domain/entities/crawler/crawler.service';
import Room from './dtos/room.dto';
import formatDate from './utils/formatDate';
import { TimeoutError } from 'puppeteer';

interface RequestProps {
  checkin: string;
  checkout: string;
}

@Injectable()
export class AppService {
  constructor(private readonly crawlerService: CrawlerService) {}
	
	async searchForOffers({checkin, checkout}: RequestProps): Promise<Room[]> {
		try {
			const domain = "https://pratagy.letsbook.com.br/";
			const URLParams = `D/Reserva?checkin=${formatDate(checkin)}&checkout=${formatDate(checkout)}`;
			const OthersURLParams =
				"&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=6%2F14%2F2022";
	
			const URL = domain + URLParams + OthersURLParams;
	
			const page = await this.crawlerService.SetupPuppeteer(URL);
	
			await page.waitForSelector("#acomodacoesContent", {
				timeout: 1000,
			});
			await page.waitForSelector("#tblAcomodacoes tbody .row-quarto");
			await page.waitForSelector(".slick-active");
		
			const roomObject = await page.evaluate(() => {
				const roomObject = [];

				const roomNodeList = document.querySelectorAll(
					"#tblAcomodacoes tbody .row-quarto"
				);
				roomNodeList.forEach((room) => {
					const name = room.querySelector(".quartoNome").textContent;
		
					const price = room.querySelector(
						".valorFinal.valorFinalDiscounted"
					).textContent;
		
					const description = room.querySelector(
						".quartoDescricao > p"
					).textContent;
		
					const image = room
						.querySelector(".slick-active .room--image")
						.getAttribute("data-src");
		
					roomObject.push({ name, price, description, image });
				});
				return roomObject;
			})

			return roomObject;
		} catch (error) {
			if (error instanceof TimeoutError) {
				// lidar com o erro de tempo limite
				throw new HttpException("Could not find the elements on the page", HttpStatus.REQUEST_TIMEOUT);
			} else {
				console.log("Error: app.service.ts");
				console.log(error);
				throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		}
	}
}
