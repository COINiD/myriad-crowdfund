import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import '../assets/styles/components/pledge-bar.css'

class PledgeSection extends PureComponent {
  static propTypes = {
    pledged: PropTypes.number,
    goal: PropTypes.number.isRequired,
  }

  static defaultProps = {
    pledged: 0.0,
  }

  render() {
    const { pledged, goal } = this.props

    let progressPercent = (pledged / goal) * 100

    if (progressPercent > 100) {
      progressPercent = 100
    }

    if (progressPercent > 0 && progressPercent < 0.1) {
      progressPercent = 0.1
    }

    return (
      <div className="pledge-bar">
        <div className="pledge-bar__progress" style={{ width: `${progressPercent}%` }} />
        <p className="pledge-bar__title">{`${pledged.toFixed(8)} BTC`}</p>
      </div>
    )
  }
}

export default PledgeSection
