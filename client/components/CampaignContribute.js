import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import CampaignContributeAnonymous from 'client/components/CampaignContributeAnonymous'
import StripeCheckout from 'client/components/StripeCheckout'

import {
  startContribCampaignCheckout
} from 'client/actions/campaign'


const CampaignContribute = React.createClass({

  render() {

    if (this.props.campaignContributingCheckout) {
      return (
        <StripeCheckout onToken={this._handleStripeToken}/>
      )
    }

    return (
      <div>
        <CampaignContributeAnonymous
          onSubmit={e => this.props.startContribCampaignCheckout()} />
      </div>
    )

  },

  _handleStripeToken(token) {

    console.log(token)

  }

})

const mapStateToProps = state => {

  let {campaignContributing, campaignContributingCheckout} = state

  return {
    campaignContributing,
    campaignContributingCheckout
  };

}


export default connect(mapStateToProps, {startContribCampaignCheckout})(CampaignContribute)
