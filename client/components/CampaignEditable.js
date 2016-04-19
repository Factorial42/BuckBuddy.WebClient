import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import {
  saveCampaign,
  addCampaignPhoto
 } from 'client/actions/campaign'

import { ColumnProps } from 'client/constants/Layout'

const colProps = ColumnProps.General


const CampaignEditable = React.createClass({

  render() {

    let {campaign, loading} = this.props;

    if (loading) return <span/>


    let nameNode = (
      <Input
        ref="txtCampaignReason"
        type='text'
        placeholder={'Buy an Island'}
        defaultValue={campaign.name} />
      ),
    amountNode = (
      <Input
        ref="txtCampaignTarget"
        type='text'
        placeholder={'$1000000'}
        defaultValue={campaign.amount} />
    ),
    descriptionNode = (
      <Input
        ref="txtCampaignDescription"
        type="textarea"
        placeholder={'No description yet...'}
        defaultValue={campaign.description || ''}
         />
    );

    return (
      <div className="campaign-editable">
        <div className="text-left">
          <label>If I had</label>
          <br/>
          {amountNode}
          <br/>
          <label>I would</label>
          <br/>
          {nameNode}
          <br/>
          <label>Description</label>
          {descriptionNode}
        </div>

        <div className="text-center">
          <SaveButton onClick={this._handleSaveClick} />
        </div>
        <br/>

        {this._getCampaignPhotoListNode()}

      </div>
    )
  },

  _getCampaignPhotoListNode() {

    let {campaign} = this.props;

    if (!campaign.profilePics) return null;

    const photoNodes = campaign.profilePics.map((pic, k) => {
      return (
        <div key={`campaign-photo-${pic.url}-${k}`} className="campaign-photo">
          <div className="btn-delete" onClick={() => {}}>
            <span className="fa fa-trash"  />
          </div>
          <img height={200} src={pic.url}/>
        </div>
      )
    })

    return (
      <div>{photoNodes} {this._getCampaignPhotoDropzoneNode()}</div>
    );
  },

  _handleSaveClick() {

    let target = this.refs.txtCampaignTarget.getInputDOMNode().value;
    let reason = this.refs.txtCampaignReason.getInputDOMNode().value;
    let description = this.refs.txtCampaignDescription.getInputDOMNode().value;

    target = parseInt(target, 10);

    //TODO...validate here?

    this.props.saveCampaign({amount: target, name: reason, description});

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
});

const SaveButton = ({onClick}) => {
  return (
    <Button onClick={onClick} className="button-action button-blue">Save</Button>
  )
}

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


export default connect(mapStateToProps, {saveCampaign, addCampaignPhoto})(CampaignEditable)
