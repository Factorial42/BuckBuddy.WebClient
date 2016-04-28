import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import CampaignContributeAnonymous from 'client/components/CampaignContributeAnonymous'
import StripeCheckout from 'client/components/StripeCheckout'

import {
  startContribCampaignCheckout,
  donate
} from 'client/actions/campaign'


const CampaignContribute = React.createClass({

  render() {

    let {
      campaignContributingCheckout,
      campaignDonation,
      startContribCampaignCheckout
    } = this.props

    if (campaignContributingCheckout) {
      return (
        <div className="text-center">
          <StripeCheckout amount={campaignDonation.amount} onToken={this._handleStripeToken}/>
        </div>
      )
    }

    return (
      <div>
        <CampaignContributeAnonymous
          onSubmit={donation => startContribCampaignCheckout(donation)} />
      </div>
    )

  },

  _handleStripeToken(token) {

    this.props.donate(token.id)

  }

})

const mapStateToProps = state => {

  let {
    campaignContributing,
    campaignContributingCheckout,
    campaignDonation
  } = state

  return {
    campaignContributing,
    campaignContributingCheckout,
    campaignDonation
  };

}


export default connect(mapStateToProps, {startContribCampaignCheckout, donate})(CampaignContribute)
