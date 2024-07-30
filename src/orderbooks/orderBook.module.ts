import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderBookController } from './orderBook.controller';
import { OrderBookService } from './orderBook.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [OrderBookController],
  providers: [OrderBookService],
})
export class OrderBookModule {}
