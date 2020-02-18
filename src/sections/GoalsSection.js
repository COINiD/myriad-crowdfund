import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Goal from '../components/Goal'
import '../assets/styles/sections/goals.css'

class GoalsSection extends PureComponent {
  static propTypes = {
    goals: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pledged: PropTypes.number,
  }

  static defaultProps = {
    pledged: 0.0,
  }

  render() {
    const { goals, pledged } = this.props

    return (
      <div className="goals container">
        <h2 className="goals__title">Goals</h2>
        <div className="goals__container">
          {goals.map((goal) => {
            const { amount, includes, title } = goal
            return (
              <Goal
                amount={amount}
                includes={includes}
                key={title}
                pledged={pledged}
                title={title}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default GoalsSection
