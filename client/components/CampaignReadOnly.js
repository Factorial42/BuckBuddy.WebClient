import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import { Link } from 'react-router'
import CampaignStats from 'client/components/CampaignStats'
import CampaignShare from 'client/components/CampaignShare'
import Slider from 'react-slick'

import {
  cancelSharingCampaign
} from 'client/actions/campaign'

const CampaignReadOnly = React.createClass({

  render() {

    let {campaign, loading} = this.props;

    if (loading) return <span/>

    return (
      <div className="campaign-readonly">

        <h4>If I had ${this._getFormattedAmount()}</h4>
        <h4>I would {campaign.name}</h4>

        {this._getDescriptionNode()}

        {this._getPhotoCarouselNode()}

        <br/>

        <CampaignStats campaign={campaign} />

        {this._getCampaignSharingModalNode()}

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
          <CampaignShare campaign={campaign} />
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

    // const carouselNode = (
    //   <Carousel indicators={false}>
    //     {carouselItemNodes}
    //   </Carousel>
    // );
    //
    // return carouselNode;

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

//TODO format

    return amount;
  }

});

const mapStateToProps = state => {

  if (!state.campaign) {
    return {
      loading: true
    }
  }

  let {campaign, campaignSharing} = state

  return {
    campaign,
    campaignSharing
  };

}


export default connect(mapStateToProps, {cancelSharingCampaign})(CampaignReadOnly)
