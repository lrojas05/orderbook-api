import { ApiProperty } from '@nestjs/swagger';
import { DataCrypto } from '../interface/orderbook.interface';
import { snapshotExample } from './doc-example/orderbook.dto';

export class OrderBookEntity {
  @ApiProperty({ example: snapshotExample.timestamp })
  timestamp: number;

  @ApiProperty({ example: snapshotExample.bids })
  bids: DataCrypto[];

  @ApiProperty({ example: snapshotExample.asks })
  asks: DataCrypto[];
}
