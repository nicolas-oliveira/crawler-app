import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import SearchDateRequestDTO from './dtos/searchdaterequest.dto';
import Room from './dtos/room.dto';
import { AppModule } from './app.module';

const mock = 

describe('AppController Unit Tests', () => {
	let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
    }).compile();

		app = module.createNestApplication();
		await app.init();
  });

	describe('search', () => {
		it('should return a list of rooms when given valid dates', async () => {
			const requestBody: SearchDateRequestDTO = {
				checkin: '2023-05-01',
				checkout: '2023-05-04',
			};

			const response = await request(app.getHttpServer())
				.post('/search')
				.send(requestBody)
				.expect(HttpStatus.CREATED);

			const responseBody: Room[] = response.body;

			expect(responseBody.length).toBeGreaterThan(0);
			expect(responseBody[0].name).toBeDefined();
			expect(responseBody[0].price).toBeDefined();
			expect(responseBody[0].description).toBeDefined();
			expect(responseBody[0].image).toBeDefined();

			return Promise.resolve();
		});

		it('should return a bad request status when given invalid dates', async () => {
			const requestBody: SearchDateRequestDTO = {
				checkin: 'XXXX-XXX-XX',
				checkout: 'XXXX-XX-XX',
			};

			await request(app.getHttpServer())
				.post('/search')
				.send(requestBody)
				.expect(HttpStatus.BAD_REQUEST || HttpStatus.REQUEST_TIMEOUT);
			
			return Promise.resolve();
		});

	});

	afterAll(async () => {
		await app.close();
	});
});
