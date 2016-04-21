import React from 'react'
import { connect } from 'react-redux'
import {
  loadCampaign
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

    this.props.loadCampaign()

    // let {userSlug, campaignSlug} = this.props
    //
    // this._redirectCampaign(userSlug, campaignSlug)

  },

  componentDidUpdate(prevProps) {

    let {userSlug, campaignSlug} = this.props;

    if (
      prevProps.userSlug !== userSlug ||
      prevProps.campaignSlug !== campaignSlug) {

        this._redirectCampaign(userSlug, campaignSlug);

    }

  },

  _redirectCampaign(userSlug, campaignSlug) {

    if (userSlug && campaignSlug) {
      browserHistory.push(`/u/${userSlug}/c/${campaignSlug}`)
    }

  }

});

const mapStateToProps = ({user, campaign}) => {

  if (user && campaign) {
    return {
      userSlug: user.userSlug,
      campaignSlug: campaign.campaignSlug
    }
  }

  return {};

}


export default connect(mapStateToProps, {loadCampaign})(CampaignLoadingPage)
