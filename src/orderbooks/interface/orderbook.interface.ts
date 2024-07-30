export interface OrderBookIn {
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
