export type DataCrypto = [string, string];

export interface OrderBookInt {
  exchange: string;
  base: string;
  quote: string;
}

export interface OrderBookOut {
  timestamp: number;
  bids: string[][];
  asks: string[][];
}

export interface UrlExchange {
  validation: string;
  orderBook: string;
}
