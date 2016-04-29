import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import { Link } from 'react-router'
import CampaignStats from 'client/components/CampaignStats'
import CampaignDonationList from 'client/components/CampaignDonationList'
import CampaignShare from 'client/components/CampaignShare'
import CampaignContribute from 'client/components/CampaignContribute'
import Slider from 'react-slick'

import {
  cancelSharingCampaign,
  cancelContribCampaign
} from 'client/actions/campaign'

const CampaignReadOnly = React.createClass({

  render() {

    let {campaign} = this.props

    return (
      <div className="campaign-readonly">

        <h4>If I had ${this._getFormattedAmount()}</h4>
        <h4>I would {campaign.name}</h4>

        {this._getDescriptionNode()}

        {this._getPhotoCarouselNode()}

        <br/>

        <CampaignStats campaign={campaign} />

        {this._getCampaignSharingModalNode()}

        {this._getCampaignContributingModalNode()}

        <h5>Contributors</h5>
        
        <CampaignDonationList />

      </div>
    )

  },

  _getCampaignSharingModalNode() {

    let {campaign} = this.props;

    return (
      <Modal show={this.props.campaignSharing} onHide={e => this.props.cancelSharingCampaign()}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CampaignShare campaign={campaign}  />
        </Modal.Body>
      </Modal>
    )

  },

  _getCampaignContributingModalNode() {

    let {campaign} = this.props;

    return (
      <Modal show={this.props.campaignContributing} onHide={e => this.props.cancelContribCampaign()}>
        <Modal.Header closeButton>
          <Modal.Title>Contribute</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CampaignContribute campaign={campaign} />
        </Modal.Body>
      </Modal>
    )

  },

  _getPhotoCarouselNode() {

    let {campaign} = this.props;

    if (!campaign.profilePics) return null;

    const carouselItemNodes = campaign.profilePics.map((pic, k) => {

      return (
        <div className="text-center" key={`campaign-photo-${pic.url}-${k}`}>
          <img height={120} width={120} src={pic.url}/>
        </div>

      )
    })

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <Slider {...settings}>
        {carouselItemNodes}
      </Slider>
    );

  },

  _getDescriptionNode() {

    let {campaign} = this.props;

    if (!campaign.description) return null;

    return (
      <p>{campaign.description}</p>
    )

  },

  _getFormattedAmount() {
    let {campaign} = this.props;

    let {amount} = campaign;

    return amount;
  }

});

const mapStateToProps = state => {

  let {campaignContributing, campaignSharing} = state

  return {
    campaignSharing,
    campaignContributing
  };

}


export default connect(mapStateToProps, {cancelSharingCampaign, cancelContribCampaign})(CampaignReadOnly)
