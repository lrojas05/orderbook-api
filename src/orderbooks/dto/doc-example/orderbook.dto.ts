import { AxiosResponse } from 'axios';
import { OrderBookIn, OrderBookOut } from '../../interface/orderbook.interface';

export const orderBookDtoExample: OrderBookIn = {
  exchange: 'binance',
  base: 'BTC',
  quote: 'USD',
};

export const symbolByExchange = 'BTCUSD';

export const urlExchange = {
  validation: 'https://api.binance.com/api/v3/exchangeInfo?symbol=BTCUSDT',
  orderBook: 'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=20',
};

export const orderBookDataValidate: AxiosResponse<any, any> = {
  data: {
    symbols: [
      {
        symbol: 'BTCUSDT',
        status: 'TRADING',
        baseAsset: 'BTC',
        baseAssetPrecision: 8,
        quoteAsset: 'USDT',
        quotePrecision: 8,
        quoteAssetPrecision: 8,
        baseCommissionPrecision: 8,
        quoteCommissionPrecision: 8,
        orderTypes: [
          'LIMIT',
          'LIMIT_MAKER',
          'MARKET',
          'STOP_LOSS',
          'STOP_LOSS_LIMIT',
          'TAKE_PROFIT',
          'TAKE_PROFIT_LIMIT',
        ],
        icebergAllowed: true,
        ocoAllowed: true,
        otoAllowed: true,
        quoteOrderQtyMarketAllowed: true,
        allowTrailingStop: true,
        cancelReplaceAllowed: true,
        isSpotTradingAllowed: true,
        isMarginTradingAllowed: true,
        filters: [
          {
            filterType: 'PRICE_FILTER',
            minPrice: '0.01000000',
            maxPrice: '1000000.00000000',
            tickSize: '0.01000000',
          },
          {
            filterType: 'LOT_SIZE',
            minQty: '0.00001000',
            maxQty: '9000.00000000',
            stepSize: '0.00001000',
          },
          {
            filterType: 'ICEBERG_PARTS',
            limit: 10,
          },
          {
            filterType: 'MARKET_LOT_SIZE',
            minQty: '0.00000000',
            maxQty: '92.81711025',
            stepSize: '0.00000000',
          },
          {
            filterType: 'TRAILING_DELTA',
            minTrailingAboveDelta: 10,
            maxTrailingAboveDelta: 2000,
            minTrailingBelowDelta: 10,
            maxTrailingBelowDelta: 2000,
          },
          {
            filterType: 'PERCENT_PRICE_BY_SIDE',
            bidMultiplierUp: '5',
            bidMultiplierDown: '0.2',
            askMultiplierUp: '5',
            askMultiplierDown: '0.2',
            avgPriceMins: 5,
          },
          {
            filterType: 'NOTIONAL',
            minNotional: '5.00000000',
            applyMinToMarket: true,
            maxNotional: '9000000.00000000',
            applyMaxToMarket: false,
            avgPriceMins: 5,
          },
          {
            filterType: 'MAX_NUM_ORDERS',
            maxNumOrders: 200,
          },
          {
            filterType: 'MAX_NUM_ALGO_ORDERS',
            maxNumAlgoOrders: 5,
          },
        ],
        permissions: [],
        permissionSets: [
          [
            'SPOT',
            'MARGIN',
            'TRD_GRP_004',
            'TRD_GRP_005',
            'TRD_GRP_006',
            'TRD_GRP_009',
            'TRD_GRP_010',
            'TRD_GRP_011',
            'TRD_GRP_012',
            'TRD_GRP_013',
            'TRD_GRP_014',
            'TRD_GRP_015',
            'TRD_GRP_016',
            'TRD_GRP_017',
            'TRD_GRP_018',
            'TRD_GRP_019',
            'TRD_GRP_020',
            'TRD_GRP_021',
            'TRD_GRP_022',
            'TRD_GRP_023',
            'TRD_GRP_024',
            'TRD_GRP_025',
            'TRD_GRP_026',
            'TRD_GRP_027',
            'TRD_GRP_028',
            'TRD_GRP_029',
            'TRD_GRP_030',
            'TRD_GRP_031',
            'TRD_GRP_032',
            'TRD_GRP_033',
            'TRD_GRP_034',
            'TRD_GRP_035',
            'TRD_GRP_036',
            'TRD_GRP_037',
            'TRD_GRP_038',
            'TRD_GRP_039',
            'TRD_GRP_040',
            'TRD_GRP_041',
            'TRD_GRP_042',
            'TRD_GRP_043',
            'TRD_GRP_044',
            'TRD_GRP_045',
            'TRD_GRP_049',
          ],
        ],
        defaultSelfTradePreventionMode: 'EXPIRE_MAKER',
        allowedSelfTradePreventionModes: [
          'EXPIRE_TAKER',
          'EXPIRE_MAKER',
          'EXPIRE_BOTH',
        ],
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: undefined,
  },
};

export const orderBookData: AxiosResponse<any, any> = {
  data: {
    lastUpdateId: 49409603992,
    bids: [
      ['66744.28000000', '0.00008000'],
      ['66744.91000000', '3.59104000'],
      ['66744.27000000', '0.59155000'],
    ],
    asks: [
      ['66744.95000000', '0.00008000'],
      ['66744.92000000', '4.04493000'],
      ['66744.96000000', '0.00180000'],
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: undefined,
  },
};

export const snapshotExample: OrderBookOut = {
  timestamp: 1722314603159,
  bids: [
    ['66744.91000000', '3.59104000'],
    ['66744.28000000', '0.00008000'],
    ['66744.27000000', '0.59155000'],
  ],
  asks: [
    ['66744.92000000', '4.04493000'],
    ['66744.95000000', '0.00008000'],
    ['66744.96000000', '0.00180000'],
  ],
};
export const orderBookDataBitmart: AxiosResponse<any, any> = {
  data: {
    code: 1000,
    trace: 'fcca6cba226e488f866b694c05e99082.113.17223171035614017',
    message: 'success',
    data: {
      ts: '1722317103493',
      symbol: 'BTC_USDT',
      asks: [
        ['66486.40', '0.10997'],
        ['66484.68', '0.00866'],
        ['66484.69', '0.00339'],
      ],
      bids: [
        ['66483.07', '0.17436'],
        ['66484.66', '0.01323'],
        ['66482.67', '0.11730'],
      ],
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: undefined,
  },
};

export const snapshotBitmartExample: OrderBookOut = {
  timestamp: new Date().getTime(),
  bids: [
    ['66484.66', '0.01323'],
    ['66483.07', '0.17436'],
    ['66482.67', '0.11730'],
  ],
  asks: [
    ['66484.68', '0.00866'],
    ['66484.69', '0.00339'],
    ['66486.40', '0.10997'],
  ],
};
