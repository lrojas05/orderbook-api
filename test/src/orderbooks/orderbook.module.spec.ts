import { Test, TestingModule } from '@nestjs/testing';

import { HttpService } from '@nestjs/axios';
import { OrderBookService } from '../../../src/orderbooks/orderBook.service';
import { OrderBookModule } from '../../../src/orderbooks/orderBook.module';

describe('OrderBookModule', () => {
  let service: OrderBookService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderBookModule],
    }).compile();

    service = module.get<OrderBookService>(OrderBookService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
