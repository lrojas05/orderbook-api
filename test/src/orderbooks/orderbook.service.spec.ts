import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderBookService } from '../../../src/orderbooks/orderBook.service';
import {
  orderBookData,
  orderBookDataBitmart,
  orderBookDataValidate,
  orderBookDtoExample,
  snapshotBitmartExample,
  snapshotExample,
  symbolByExchange,
  urlExchange,
} from '../../../src/orderbooks/dto/doc-example/orderbook.dto';

import { OrderBookIn } from '../../../src/orderbooks/interface/orderbook.interface';
import { of } from 'rxjs';

describe('OrderBookService', () => {
  let service: OrderBookService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBookService, HttpService],
    }).compile();

    service = module.get<OrderBookService>(OrderBookService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getPairs', () => {
    it('should return cached pairs if available', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(of(orderBookDataValidate));
      jest
        .spyOn(service as any, 'extractDataByExchange')
        .mockReturnValue(orderBookDataValidate.data);

      const result = await service.getPairs(
        {
          exchange: 'binance',
          base: 'BTC',
          quote: 'USDT',
        },
        urlExchange,
      );

      expect(result).toEqual(orderBookDataValidate.data);
    });

    describe('getSnapshot', () => {
      it('should return an order book snapshot', async () => {
        jest
          .spyOn(service as any, 'convertPairs')
          .mockReturnValue(symbolByExchange);
        jest
          .spyOn(service as any, 'selectUrlExchange')
          .mockReturnValue(urlExchange);
        jest
          .spyOn(service as any, 'getPairs')
          .mockResolvedValue([symbolByExchange]);
        jest
          .spyOn(service as any, 'orderSnapshot')
          .mockReturnValue(snapshotExample);
        jest.spyOn(httpService, 'get').mockReturnValue(of(orderBookData));

        const result = await service.getSnapshot(orderBookDtoExample);

        expect(result).toEqual(snapshotExample);
        expect(httpService.get).toHaveBeenCalledWith(urlExchange.orderBook);
      });

      it('should throw BadRequestException if symbol is not valid', async () => {
        const mockPairs = ['ETHUSDT'];
        jest.spyOn(service, 'getPairs').mockResolvedValue(mockPairs);

        await expect(
          service.getSnapshot({
            exchange: 'binance',
            base: 'BTC',
            quote: 'USDT',
          } as OrderBookIn),
        ).rejects.toThrow(BadRequestException);
      });
    });

    describe('convertPairs', () => {
      it('should convert pairs correctly for bitmart', () => {
        const result = service['convertPairs']({
          exchange: 'bitmart',
          base: 'BTC',
          quote: 'USDT',
        } as OrderBookIn);
        expect(result).toBe('BTC_USDT');
      });

      it('should convert pairs correctly for binance', () => {
        const result = service['convertPairs']({
          exchange: 'binance',
          base: 'BTC',
          quote: 'USDT',
        } as OrderBookIn);
        expect(result).toBe('BTCUSDT');
      });

      it('should throw NotFoundException for unsupported exchange', () => {
        expect(() =>
          service['convertPairs']({
            exchange: 'visma',
            base: 'BTC',
            quote: 'USDT',
          } as OrderBookIn),
        ).toThrow(NotFoundException);
      });
    });

    describe('selectUrlExchange', () => {
      it('should return correct URLs for bitmart', () => {
        const result = service['selectUrlExchange']('bitmart', 'BTC_USDT');
        expect(result).toEqual({
          validation: 'https://api-cloud.bitmart.com/spot/v1/symbols',
          orderBook:
            'https://api-cloud.bitmart.com/spot/quotation/v3/books?symbol=BTC_USDT&limit=20',
        });
      });

      it('should return correct URLs for binance', () => {
        const result = service['selectUrlExchange']('binance', 'BTCUSDT');
        expect(result).toEqual({
          validation:
            'https://api.binance.com/api/v3/exchangeInfo?symbol=BTCUSDT',
          orderBook:
            'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=20',
        });
      });

      it('should throw NotFoundException for unsupported exchange', () => {
        expect(() => service['selectUrlExchange']('visma', 'BTCUSDT')).toThrow(
          NotFoundException,
        );
      });
    });

    describe('orderSnapshot', () => {
      it('should format order book for bitmart', () => {
        const result = service['orderSnapshot'](
          'bitmart',
          orderBookDataBitmart.data,
        );

        expect(result.bids).toEqual(snapshotBitmartExample.bids);
        expect(result.asks).toEqual(snapshotBitmartExample.asks);
      });

      it('should format order book for binance', () => {
        const result = service['orderSnapshot']('binance', snapshotExample);
        expect(result.bids).toEqual(snapshotExample.bids);
        expect(result.asks).toEqual(snapshotExample.asks);
      });

      it('should throw an error for unsupported exchange', () => {
        expect(() => service['orderSnapshot']('binance', {})).toThrow(Error);
      });
    });

    describe('extractDataByExchange', () => {
      it('should extract symbols for bitmart', () => {
        const result = service['extractDataByExchange']('bitmart', {
          data: { symbols: ['BTC_USDT'] },
        });
        expect(result).toEqual(['BTC_USDT']);
      });

      it('should extract symbols for binance', () => {
        const result = service['extractDataByExchange']('binance', {
          symbols: [{ symbol: 'BTCUSDT' }],
        });
        expect(result).toEqual(['BTCUSDT']);
      });

      it('should throw an error for unsupported exchange', () => {
        expect(() => service['extractDataByExchange']('binance', {})).toThrow(
          Error,
        );
      });
    });
  });
});
