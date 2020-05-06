import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import '../assets/styles/components/goal.css'
import checkbox from '../assets/images/checkbox.png'

class Goal extends PureComponent {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    includes: PropTypes.arrayOf(PropTypes.string.isRequired),
    pledged: PropTypes.number.isRequired,
  }

  static defaultProps = {
    includes: [],
  }

  render() {
    const { title, includes, amount, pledged } = this.props

    const completed = pledged >= amount

    return (
      <div className="goal">
        <p className="goal__title">{title}</p>
        <div className="goal__amount-container">
          <p
            className={[
              'goal__amount',
              completed ? 'goal__amount--completed' : null,
            ].join(' ')}
          >
            {`${amount} BTC`}
          </p>
          {completed && (
            <img src={checkbox} alt="Completed" className="goal__completed" />
          )}
        </div>
        <ul className="goal__list">
          {includes.map((included, i) => (
            <li key={i} className="goal__included">
              {included}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Goal
