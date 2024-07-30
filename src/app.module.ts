import { Module } from '@nestjs/common';
import { OrderBookModule } from './orderbooks/orderBook.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    OrderBookModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
})
export class AppModule {}
