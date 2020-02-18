import React, { PureComponent } from 'react'
import { sum, values } from 'lodash-es'
import moment from 'moment-timezone'
import CollectionSection from './sections/CollectionSection'
import GoalsSection from './sections/GoalsSection'
import HeaderSection from './sections/HeaderSection'
import PledgeSection from './sections/PledgeSection'
import ExchangeHelper from './utils/exchangeHelper'
import './assets/styles/shared/app.css'

class App extends PureComponent {
  state = {
    coins: [
      { ticker: 'BTC', address: '34Zmzk5jJU5AhQFzqyS72BEDx9ZTGa58X6' },
      {
        ticker: 'XMY',
        address: 'MPYeuSbY6EUVCqkH1pPJVkZbBUp7fc4ATP',
      },
    ],
    balances: {
      BTC: 0.0,
      XMY: 0.0,
    },
    endDate: moment.tz('2020-03-30 12:00', 'Europe/Stockholm'),
    pledged: 0,
    goal: 3,
    goals: [
      {
        amount: 0.5,
        title: 'Goal 1',
        includes: ['New design', 'New website'],
      },
      {
        amount: 1,
        title: 'Goal 2',
        includes: [
          'New design',
          'New website',
          'Multi language support',
          '2 Blog posts',
        ],
      },
      {
        amount: 2,
        title: 'Goal 3',
        includes: [
          'New design',
          'New website',
          'Multi language support',
          '4 Blog posts',
          'Promotion material',
        ],
      },
    ],
  }

  insights = {
    BTC: 'https://btc-blockbook1.coinid.org',
    XMY: 'https://xmy-blockbook1.coinid.org',
  }

  exchangeHelpers = {}

  componentDidMount() {
    const { coins } = this.state
    coins.map(coin => {
      const { address, ticker } = coin

      if (ticker !== 'BTC') {
        this.exchangeHelpers[ticker] = ExchangeHelper(ticker)
      }

      return this.fetchAddressBalance({ address, ticker })
    })
  }

  convertToBTC = (ticker, balance) =>
    this.exchangeHelpers[ticker].convert(balance, 'BTC')

  fetchAddressBalance = ({ address, ticker }) => {
    const requests = [fetch(`${this.insights[ticker]}/api/address/${address}`)]

    Promise.all(requests)
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(balances => {
        const total = sum(balances.map(balance => Number(balance.balance)))
        return ticker !== 'BTC' ? this.convertToBTC(ticker, total) : total
      })
      .then(btcValue => {
        const { balances } = this.state
        const newBalances = Object.assign({}, balances)
        newBalances[ticker] = btcValue

        let pledged = sum(values(newBalances))

        if (pledged <= 0.0) {
          pledged = 0.0
        }
        this.setState({ balances: newBalances, pledged })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { coins, endDate, goal, goals, pledged } = this.state

    return (
      <div className="wrapper">
        <HeaderSection />
        <PledgeSection goal={goal} pledged={pledged} endDate={endDate} />
        <GoalsSection goals={goals} pledged={pledged} />
        <CollectionSection coins={coins} insights={this.insights} />
      </div>
    )
  }
}

export default App
