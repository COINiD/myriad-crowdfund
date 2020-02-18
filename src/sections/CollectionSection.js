import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import '../assets/styles/sections/collection.css'

class CollectionSection extends PureComponent {
  static propTypes = {
    coins: PropTypes.arrayOf(
      PropTypes.shape({
        ticker: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      }),
    ).isRequired,
    insights: PropTypes.shape({}).isRequired,
  }

  renderCollection = () => {
    const { coins, insights } = this.props
    return (
      <div className="collection container">
        <div className="collection__container">
          <h3 className="collection__title">Collection Addresses</h3>
          <div className="collection__coins">
            {coins.map(coin => (
              <div className="collection__coin" key={coin.ticker}>
                <span className="collection__ticker">{coin.ticker}</span>
                <a
                  className="collection__address"
                  href={`${insights[coin.ticker]}/address/${coin.address}`}
                >
                  {coin.address}
                </a>
              </div>
            ))}
          </div>
          <p className="collection__info">
            If the goal is not met before the deadline coins sent will be returned to the sending
            address.
          </p>
        </div>
        <h3 className="collection__subtitle">Happy crowdfunding!</h3>
      </div>
    )
  }

  render() {
    const { coins } = this.props
    return !coins ? null : this.renderCollection()
  }
}

export default CollectionSection
