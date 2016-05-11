import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'bootstrap'
import { Link } from 'react-router'
import {
  cancelEditingCampaign,
  startContribCampaign,
  saveCampaign,
  loadCampaign,
  addCampaignPhoto
} from 'client/actions/campaign'
import Dropzone from 'react-dropzone'
import UserPhoto from 'client/components/UserPhoto'
import CampaignReadOnly from 'client/components/CampaignReadOnly'
import CampaignEditable from 'client/components/CampaignEditable'
import { ColumnProps } from 'client/constants/Layout'

const colProps = ColumnProps.General

const CampaignPage = React.createClass({

  render() {

    if (this.props.loading) return <span>Loading...</span>

    let { loading, campaignEditing, campaign, owner, user } = this.props

    return (
      <Row>
        <Col {...colProps}>
          <UserPhoto user={user} editable={owner} />
        </Col>

        <Col {...colProps}>
          <h5>{user.name}</h5>
        </Col>

        <Col {...colProps}>
          {this._getCampaignDetailsNode()}
        </Col>

        <Col {...colProps}>
          {this._getContributeButtonNode()}
        </Col>
      </Row>
    )

  },

  _getContributeButtonNode() {

    let {owner} = this.props;

    if (owner) return null;

    return (
      <Button
        onClick={() => this.props.startContribCampaign()}
        className="button-action button-blue">Contribute</Button>
    )

  },

  _getCampaignDetailsNode() {

    let {campaignEditing} = this.props;

    if (campaignEditing) {
      return (
        <CampaignEditable />
      )
    }

    return (
      <CampaignReadOnly {...this.props} />
    )

  },

  _getCampaignPhotoDropzoneNode() {

    let activeStyle = {
      borderStyle: 'solid',
      backgroundColor: '#eee'
    };

    return (
      <Dropzone
        onDrop={this._onDropPhoto}
        className="dropzone dropzone-square dropzone-campaign-photo"
        activeStyle={activeStyle}>
        <div className="dropzone-plus">+</div>
      </Dropzone>
    );

  },

  _onDropPhoto(files) {

    this.props.addCampaignPhoto(files[0])

  },

  componentDidMount() {
    this.props.loadCampaign(this.props.params.campaignSlug, this.props.params.userSlug)
  }

});

const mapStateToProps = state => {

  if (!state.campaign || !state.campaign.user) {
    return {
      loading: true
    }
  }

  let user = state.campaign.user;

  let owner = false;

  if (state.user) {
    if (state.user.userId === state.campaign.userId) {
      owner = true;
      user = state.user
    }
  }

  let {campaignEditing, campaign} = state

  return {
    campaignEditing,
    campaign,
    user,
    owner
  };

}

const setPhoto = () => console.log('TODO....add handler')

export default connect(mapStateToProps, {
  setPhoto,
  cancelEditingCampaign,
  startContribCampaign,
  saveCampaign,
  loadCampaign,
  addCampaignPhoto
})(CampaignPage)
