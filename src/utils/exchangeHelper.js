/**
 * Helper for retrieving fees.
 * All fees are displayed as fee-per-byte (in satoshis)
 */

import { EventEmitter } from 'events'

const apiUrl = 'https://min-api.cryptocompare.com/data'

const fetchFromPriceApi = (ticker, currency) => {
  const url = `${apiUrl}/price?fsym=${ticker.toUpperCase()}&tsyms=${currency.toUpperCase()}`

  return fetch(url)
    .then(r => r.json())
    .then(j => j[currency])
}

class ExchangeHelper extends EventEmitter {
  constructor(coin) {
    super()
    const newCoin = coin === 'TBTC' ? 'BTC' : coin
    this.ticker = newCoin
    this.currencyArr = ['BTC']
  }

  fetchCurrentPrice = currency => fetchFromPriceApi(this.ticker, currency)

  convert = (amount, currency) => this.fetchCurrentPrice(currency).then(price => price * amount)
}

const exchangeHelperCache = {} // for local caching so we dont create several for same coin.

export default function (coin) {
  if (exchangeHelperCache[coin] === undefined) {
    exchangeHelperCache[coin] = new ExchangeHelper(coin)
  }

  return exchangeHelperCache[coin]
}
