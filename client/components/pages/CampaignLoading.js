import React from 'react'
import { connect } from 'react-redux'
import {
  loadCampaign,
  goToCampaign
} from 'client/actions/campaign'

import { browserHistory } from 'react-router'

const CampaignLoadingPage = React.createClass({

  render() {
    return (
      <div className="page-campaign-loading">
        Loading...
      </div>
    )

  },

  componentDidMount() {

    this.props.goToCampaign()

    // let {userSlug, campaignSlug} = this.props
    //
    // this._redirectCampaign(userSlug, campaignSlug)

  }

});

// const mapStateToProps = ({user, campaign}) => {
//
//   if (user && campaign) {
//     return {
//       userSlug: user.userSlug,
//       campaignSlug: campaign.campaignSlug
//     }
//   }
//
//   return {};
//
// }


export default connect(null, {goToCampaign})(CampaignLoadingPage)
