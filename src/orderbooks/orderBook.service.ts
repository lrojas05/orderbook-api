import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  OrderBookIn,
  OrderBookOut,
  UrlExchange,
} from './interface/orderbook.interface';

@Injectable()
export class OrderBookService {
  private pairsCache: Record<string, string[]> = {};
  constructor(private readonly httpService: HttpService) {}

  async getPairs(input: OrderBookIn, url: UrlExchange): Promise<string[]> {
    if (!this.pairsCache[input.exchange]) {
      const response = await firstValueFrom(
        this.httpService.get(url.validation),
      );
      this.pairsCache[input.exchange] = this.extractDataByExchange(
        input.exchange,
        response.data,
      );
    }
    return this.pairsCache[input.exchange];
  }

  async getSnapshot(input: OrderBookIn): Promise<OrderBookOut> {
    try {
      const symbolByExchange = this.convertPairs(input);
      const url = this.selectUrlExchange(input.exchange, symbolByExchange);
      const pairs = await this.getPairs(input, url);

      if (!pairs.includes(symbolByExchange)) {
        throw new Error(
          `The symbol ${symbolByExchange} is not included in the list of allowed pairs.`,
        );
      }

      const orderBook = await firstValueFrom(
        this.httpService.get(url.orderBook),
      );

      return this.orderSnapshot(input.exchange, orderBook.data);
    } catch (e) {
      throw new BadRequestException({
        description: e.message,
      });
    }
  }

  private convertPairs(int: OrderBookIn): string {
    switch (int.exchange) {
      case 'bitmart': {
        return int.base.concat('_', int.quote).toUpperCase();
      }
      case 'binance': {
        return int.base.concat(int.quote).toUpperCase();
      }
      default:
        throw new NotFoundException(`Error whith ${int.base} and ${int.quote}`);
    }
  }

  private selectUrlExchange(
    exchange: string,
    symbolByExchange: string,
  ): UrlExchange {
    let validation: string = '';
    let orderBook: string = '';
    switch (exchange) {
      case 'bitmart': {
        validation = 'https://api-cloud.bitmart.com/spot/v1/symbols';
        orderBook = `https://api-cloud.bitmart.com/spot/quotation/v3/books?symbol=${symbolByExchange}&limit=20`;
        return {
          validation,
          orderBook,
        };
      }

      case 'binance': {
        validation = `https://api.binance.com/api/v3/exchangeInfo?symbol=${symbolByExchange}`;
        orderBook = `https://api.binance.com/api/v3/depth?symbol=${symbolByExchange}&limit=20`;
        return {
          validation,
          orderBook,
        };
      }

      default:
        throw new NotFoundException(`Error with ${exchange}`);
    }
  }

  private orderSnapshot(exchange: string, data: any): OrderBookOut {
    switch (exchange) {
      case 'bitmart':
        return {
          timestamp: new Date().getTime(),
          bids: data.data.bids
            .slice(0, 20)
            .sort((a: number, b: number) => b[0] - a[0]),
          asks: data.data.asks
            .slice(0, 20)
            .sort((a: number, b: number) => a[0] - b[0]),
        };
      case 'binance':
        return {
          timestamp: new Date().getTime(),
          bids: data.bids
            .slice(0, 20)
            .sort((a: number, b: number) => b[0] - a[0]),
          asks: data.asks
            .slice(0, 20)
            .sort((a: number, b: number) => a[0] - b[0]),
        };
      default:
        throw new Error('Unsupported exchange');
    }
  }

  private extractDataByExchange(exchange: string, data: any): string[] {
    switch (exchange) {
      case 'bitmart':
        return data.data.symbols;

      case 'binance':
        return data.symbols.map((symbol) => symbol.symbol);
      default:
        throw new Error('Unsupported exchange');
    }
  }
}
