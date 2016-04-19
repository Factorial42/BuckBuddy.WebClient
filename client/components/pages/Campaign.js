import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
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

const colProps = {
  xs: 12,
  lg: 2,
  lgOffset: 5,
  className: 'text-center'
}

const CampaignPage = React.createClass({

  render() {

    if (this.props.loading) return <span>Loading...</span>

    return (
      <Row>
        <Col {...colProps}>

          <UserPhoto {...this.props} />

        </Col>

        {this._getCampaignDetailsNode()}
      </Row>
    )

  },

  _getCampaignDetailsNode() {

    let {campaign, campaignEditing} = this.props
    if (!campaign) return null

    if (campaignEditing) {

    }

    let nameNode = (
      <Input
        ref="txtCampaignReason"
        type='text'
        placeholder={'Buy an Island'}
        onChange={e => this.props.startEditingCampaign()}
        defaultValue={campaign.name} />
      ),
    amountNode = (
      <Input
        ref="txtCampaignTarget"
        type='text'
        placeholder={'$1000000'}
        onChange={e => this.props.startEditingCampaign()}
        defaultValue={campaign.amount} />
    );

    return (
      <div>
        <Col {...colProps} className="text-left">
          <label>If I had</label>
        </Col>
        <Col {...colProps} className="text-center">
          {amountNode}
        </Col>
        <Col {...colProps} className="text-left">
          <label>I would</label>
        </Col>
        <Col {...colProps} className="text-center">
          {nameNode}
        </Col>
        <Col xs={12} className="text-center">
          {this._getCampaignButtonNode()}
        </Col>

        <Col xs={12} className="text-center">
          {this._getCampaignPhototListNode()}
        </Col>

      </div>
    )

  },

  _getCampaignPhototListNode() {

    let {campaign} = this.props;

    let listNodes = [];

    if (campaign.profilePics) {

      listNodes = campaign.profilePics.map(pic => {
        return (
          <div key={`campaign-photo-${pic.url}`} className="campaign-photo">
            <img src={pic.url} />
          </div>
        )
      })

    }

    return (
      <div>
        {listNodes}
        {this._getCampaignPhotoDropzoneNode()}
      </div>
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

    target = parseInt(target, 10);

    //TODO...validate here?

    this.props.saveCampaign({amount: target, name: reason});

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

  let {userId, profilePic} = state.user
  let {campaignEditing, campaign} = state

  return {userId, profilePic, campaignEditing, campaign};

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
