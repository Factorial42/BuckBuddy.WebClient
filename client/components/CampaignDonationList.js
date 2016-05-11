import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import moment from 'moment'

import {
  getMoreDonations,
  thankDonor
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
    let thankDonorNode = null;

    let {owner, thankDonor} = this.props;

    if (owner && donation.thankable) {

      let clickHandler = () => this.props.thankDonor(donation.donationId);

      let donationClassName = "campaign-donation-thank"

      if (donation.thanked) {
        clickHandler = () => {}
        donationClassName += " campaign-donation-thanked"
      }

      thankDonorNode = (
        <div className={donationClassName}>
          <span className="fa fa-2x fa-thumbs-o-up" onClick={clickHandler} />
        </div>
      )
    }

    return (
      <Row>
        <Col lg={12}>
          <div className="campaign-donation">
            <div className="campaign-donation-top-line">
              {this._getDonorPicNode(donation)}
              <div className="campaign-donation-statement">
                {donation.firstName} contributed <span className="campaign-donation-amount">${donation.amountInCents / 100}</span>
              </div>
              {thankDonorNode}
            </div>
            <div className="campaign-donation-created">
              {moment(donation.createdAt * 1000).format('MMM, DD YYYY')}
            </div>
          </div>
        </Col>
      </Row>
    )
  },

  _getDonorPicNode({donorProfilePic = 'https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97100&w=100&h=100'}) {

    return (
      <div className="campaign-donation-photo">
        <img src={donorProfilePic} />
      </div>
    )

  }
})

const mapStateToProps = state => {

  let {
    campaignDonationList: {donations},
    user,
    campaign
  } = state

  let owner = user && campaign && user.userId === campaign.userId;

  return {
    donations: donations.donations,
    count: donations.count,
    owner
  };

}


export default connect(mapStateToProps, {
  getMoreDonations,
  thankDonor
})(CampaignDonationList)
