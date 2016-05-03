import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import CampaignContributeForm from 'client/components/CampaignContributeForm'
import StripeCheckout from 'client/components/StripeCheckout'

import {
  startContribCampaignCheckout,
  donate,
  loadFbDonorInfo
} from 'client/actions/campaign'


const CampaignContribute = React.createClass({

  render() {

    let {
      user,
      campaignContributingCheckout,
      campaignDonation
    } = this.props

    if (campaignContributingCheckout) {
      return (
        <div className="text-center">
          <StripeCheckout amount={campaignDonation.amount} onToken={this._handleStripeToken}/>
        </div>
      )
    }

    return this._getContributionForNode()

  },

  _getContributionForNode() {

    return (
      <div>
        <CampaignContributeForm
          initialValues={this.props.initialValues}
          onSubmit={donation => {
            //console.log(donation)
            this.props.startContribCampaignCheckout(donation)
          }} />

          <div className="text-center">
            <Button onClick={e => this.props.loadFbDonorInfo()} className="button-action button-fb">Use FB Profile</Button>
          </div>          
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
    campaignDonation,
    campaignDonationFbInfo,
    user
  } = state

  let initialValues = {};

  if (campaignDonationFbInfo) {
    initialValues = {
      name: campaignDonationFbInfo.name,
      photoUri: campaignDonationFbInfo.photoUri
    }
  } else if (user) {
    initialValues = {
      name: user.firstName,
      photoUri: user.profilePic
    }
  }

  return {
    campaignContributing,
    campaignContributingCheckout,
    campaignDonation,
    initialValues
  };
}

export default connect(mapStateToProps, {
  startContribCampaignCheckout,
  loadFbDonorInfo,
  donate
})(CampaignContribute)
