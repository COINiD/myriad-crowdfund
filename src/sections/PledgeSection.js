import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PledgeBar from '../components/PledgeBar'
import '../assets/styles/sections/pledge.css'

class PledgeSection extends PureComponent {
  static propTypes = {
    pledged: PropTypes.number,
    goal: PropTypes.number.isRequired,
    endDate: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    pledged: 0.0,
  }

  render() {
    const { endDate, goal, pledged } = this.props
    return (
      <div className="pledge container">
        <h2 className="pledge__title">Pledged</h2>
        <PledgeBar pledged={pledged} goal={goal} />
        <em className="pledge__notice">
          {`Deadline for crowdfunding is ${endDate.format(
            'MMMM D, YYYY @ HH:mm z'
          )}.`}
        </em>
      </div>
    )
  }
}

export default PledgeSection
