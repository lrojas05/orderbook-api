<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/user-attachments/assets/e84775f1-312b-4afb-8c3c-65a485f49ae8"
 width="200" /></a>
</p>

## Description
Crear una API que dado un exchange y un símbolo de un par te devuelva un snapshot del
orderbook con los primeros 20 niveles

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lrojas05/orderbook-api.git
cd orderbook-api
```
2. Install dependency
```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev
```

## Test

```bash
# unit tests
npm run test


# test coverage
npm run test:cov
```


### Swagger 
http://localhost:3000/doc
![image](https://github.com/user-attachments/assets/cacb8ca0-467e-4762-ae81-3a45b7f8a368)

```bash
  exchange: 'binance',
  base: 'BTC',
  quote: 'USD',
```

## Author
Lany Rojas
