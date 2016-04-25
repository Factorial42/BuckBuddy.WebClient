import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'

const leftColProps = {
  xs: 4,
  xsOffset: 2,
  md: 3,
  mdOffset: 3,
  sm: 3,
  smOffset: 3,
  lg: 2,
  lgOffset: 3
}

const CampaignStats = React.createClass({

  render() {

    let {campaign} = this.props

    return (
      <div className="campaign-stats">

        <Row>
          <Col {...leftColProps} className="text-left">
            <label>Funds</label>
          </Col>

          <Col {...leftColProps} className="text-left">
            <span style={{fontSize: 20}}>$0</span>
          </Col>
        </Row>


        <Row>
          <Col {...leftColProps} className="text-left">
            <label>Contributors</label>
          </Col>

          <Col {...leftColProps} className="text-left">
            {campaign.contributorsCount}
          </Col>
        </Row>

        <Row>
          <Col {...leftColProps} className="text-left">
            <label>Days</label>
          </Col>

          <Col {...leftColProps} className="text-left">
            {campaign.days}
          </Col>
        </Row>


      </div>
    )

  }

});



export default CampaignStats
