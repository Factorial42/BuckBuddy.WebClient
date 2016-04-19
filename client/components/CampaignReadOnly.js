import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'

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
      </div>
    )

  },

  _getPhotoCarouselNode() {

    let {campaign} = this.props;

    if (!campaign.profilePics) return null;

    const carouselItemNodes = campaign.profilePics.map((pic, k) => {
      return (

        <Carousel.Item key={`campaign-photo-${pic.url}-${k}`}>
          <div className="text-center">
            <img height={120} src={pic.url}/>
          </div>
        </Carousel.Item>
      )
    })

    const carouselNode = (
      <Carousel indicators={false}>
        {carouselItemNodes}
      </Carousel>
    );

    return carouselNode;

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

  let {campaign} = state

  return {
    campaign
  };

}


export default connect(mapStateToProps, {})(CampaignReadOnly)
