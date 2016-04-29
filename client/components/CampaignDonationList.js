import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import moment from 'moment'

import {
  getMoreDonations
} from 'client/actions/campaign'

const CampaignDonationList = React.createClass({

  render() {

    let {
      donations
    } = this.props

    let listItemNodes = donations.map(this._getDonationListItemNode)
    return (
      <div>
        {listItemNodes}
      </div>
    )

  },

  _getDonationListItemNode(donation) {
    return (
      <Row>
        <Col lg={7} lgOffset={3}>
          <div className="campaign-donation">
            {donation.firstName} contributed <span className="campaign-donation-amount">${donation.amountInCents / 100}</span>
            <h6>{moment(donation.createdAt * 1000).format('MM/DD/YYYY')}</h6>
          </div>
        </Col>
      </Row>
    )
  }

})

const mapStateToProps = state => {

  let {
    campaignDonationList: {donations}
  } = state

  return {
    donations: donations.donations,
    count: donations.count
  };

}


export default connect(mapStateToProps, {getMoreDonations})(CampaignDonationList)
