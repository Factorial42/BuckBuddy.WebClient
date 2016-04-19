import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'bootstrap'
import { Link } from 'react-router'
import {
  startEditingCampaign,
  cancelEditingCampaign,
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

    let {user, loading, campaignEditing} = this.props

    return (
      <Row>
        <Col {...colProps}>
          <UserPhoto />
        </Col>

        <Col {...colProps}>
          <h5>{user.firstName} {user.lastName}</h5>
        </Col>

        <Col {...colProps}>
          {this._getCampaignDetailsNode()}
        </Col>

        <Col {...colProps}>
          {this._getCampaignEditButtonNode()}
        </Col>
      </Row>
    )

  },

  _getCampaignEditButtonNode() {

    let {owner, campaignEditing} = this.props;

    if (!owner || campaignEditing) return null;

    return (
      <a onClick={e => this.props.startEditingCampaign()}><span className="fa fa-pencil"></span>Edit Campaign</a>
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
      <CampaignReadOnly />
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

  _getCampaignButtonNode() {

    let {campaignEditing} = this.props

    if (!campaignEditing) return null

    return (
      <SaveButton onClick={this._handleSaveClick} />
    )

  },

  _handleSaveClick() {

    let target = this.refs.txtCampaignTarget.getInputDOMNode().value;
    let reason = this.refs.txtCampaignReason.getInputDOMNode().value;
    let description = this.refs.txtCampaignDescription.getInputDOMNode().value;

    target = parseInt(target, 10);

    //TODO...validate here?

    this.props.saveCampaign({amount: target, name: reason, description});

  },

  _getEditCampaignButtonNode() {

    return (
      <a onClick={this._handleEditClick}>Edit campaign</a>
    );

  },

  _handleEditClick() {

    this.props.startEditingCampaign()

  },

  componentDidMount() {

    //TODO: use the slug...
    this.props.loadCampaign()
  }

});

const SaveButton = ({onClick}) => {
  return (
    <Button onClick={onClick} className="button-action button-blue">Save</Button>
  )
}


const mapStateToProps = state => {

  if (!state.user)

  return {
    loading: true
  }

  let {campaignEditing, campaign, user} = state

  return {
    user,
    campaignEditing,
    campaign,
    owner: true //TODO: get the `owner` value from state...
  };

}

const setPhoto = () => console.log('TODO....add handler')

export default connect(mapStateToProps, {
  setPhoto,
  startEditingCampaign,
  cancelEditingCampaign,
  saveCampaign,
  loadCampaign,
  addCampaignPhoto
})(CampaignPage)
