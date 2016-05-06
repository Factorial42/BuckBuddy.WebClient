import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'

const colProps = {
  lg: 12
}

const rightColProps = {
  lg: 1,
  className: "text-right"
}

const CampaignStats = React.createClass({

  render() {

    let {campaign} = this.props

    return (
      <div className="campaign-stats">
        <Row>
          <Col {...colProps}>
            <div className="campaign-stats-row">
              <label className="campaign-stats-label">
                Funds
              </label>
              <div className="campaign-stats-line"/>
              <div className="campaign-stats-value campaign-stats-value-main">
                ${campaign.collectedAmount / 100}
              </div>

            </div>
          </Col>
        </Row>

        <Row>
          <Col {...colProps}>
            <div className="campaign-stats-row">
              <label className="campaign-stats-label">
                Contributors
              </label>
              <div className="campaign-stats-line"/>
              <div className="campaign-stats-value">
                {campaign.contributorsCount}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col {...colProps}>
            <div className="campaign-stats-row">
              <label className="campaign-stats-label">
                Days
              </label>
              <div className="campaign-stats-line"/>
              <div className="campaign-stats-value">
                {campaign.days}
              </div>
            </div>
          </Col>
        </Row>

      </div>
    )

  }

});



export default CampaignStats
