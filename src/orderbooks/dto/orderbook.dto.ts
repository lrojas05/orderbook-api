import { ApiProperty } from '@nestjs/swagger';
import { snapshotExample } from './doc-example/orderbook.dto';

export class OrderBookEntity {
  @ApiProperty({ example: snapshotExample.timestamp })
  timestamp: number;

  @ApiProperty({ example: snapshotExample.bids })
  bids: string[][];

  @ApiProperty({ example: snapshotExample.asks })
  asks: string[][];
}
