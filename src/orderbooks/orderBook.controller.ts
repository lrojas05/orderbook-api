import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderBookService } from './orderBook.service';
import { OrderBookOut } from './interface/orderbook.interface';
import { snapshotExample } from './dto/doc-example/orderbook.dto';
import { OrderBookEntity } from './dto/orderbook.dto';

@ApiTags('OrderBook')
@Controller('orderBook')
export class OrderBookController {
  constructor(private readonly orderBookService: OrderBookService) {}

  @ApiOperation({ summary: 'Retrieve Order Book Snapshot' })
  @ApiResponse({
    status: 200,
    description: 'List of Custom Order Pairs',
    type: OrderBookEntity,
    example: snapshotExample,
  })
  @Get('')
  async getSnapshot(
    @Query('exchange') exchange: string,
    @Query('base') base: string,
    @Query('quote') quote: string,
  ): Promise<OrderBookOut> {
    return await this.orderBookService.getSnapshot({
      exchange: exchange,
      base: base,
      quote: quote,
    });
  }
}
