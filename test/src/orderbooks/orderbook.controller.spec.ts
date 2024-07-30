import { Test, TestingModule } from '@nestjs/testing';
import { OrderBookController } from '../../../src/orderbooks/orderBook.controller';
import { OrderBookService } from '../../../src/orderbooks/orderBook.service';
import { snapshotExample } from '../../../src/orderbooks/dto/doc-example/orderbook.dto';
import { OrderBookOut } from 'src/orderbooks/interface/orderbook.interface';

describe('OrderBookController', () => {
  let controller: OrderBookController;

  const mockOrderBookService = {
    getSnapshot: jest.fn().mockResolvedValue(snapshotExample),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBookController],
      providers: [
        {
          provide: OrderBookService,
          useValue: mockOrderBookService,
        },
      ],
    }).compile();

    controller = module.get<OrderBookController>(OrderBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GetSnapshot Return OrderBookOut', async () => {
    const result: OrderBookOut = await controller.getSnapshot(
      'bitmart',
      'BTC',
      'USD',
    );

    expect(result).toBe(snapshotExample);
  });
});
