import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import CampaignForm from 'client/components/CampaignForm'

import {
  saveCampaign,
  addCampaignPhoto
 } from 'client/actions/campaign'

import { ColumnProps } from 'client/constants/Layout'

const colProps = ColumnProps.General

const CampaignEditable = React.createClass({

  render() {

    let {campaign: {amount, name, description}, loading} = this.props;

    if (loading) return <span/>
    let formColProps = {
      xs: 12,
      md: 12,
      sm: 12,
      lg: 12,
      className: 'text-center'
    }

    return (
      <div className="campaign-editable">

      <CampaignForm
        saveButtonText='Save'
        colProps={formColProps}
        initialValues={{amount, name, description}}
        showDescription
        onSubmit={this._onSubmit}
        submitting={false}
        />

        <br/>

        {this._getCampaignPhotoListNode()}

      </div>
    )
  },

  _getCampaignPhotoListNode() {

    let {campaign} = this.props;

    let photoNodes = [];

    if (campaign.profilePics) {
      photoNodes = campaign.profilePics.map((pic, k) => {
        return (
          <div key={`campaign-photo-${pic.url}-${k}`} className="campaign-photo">
            <div className="btn-delete" onClick={() => {}}>
              <span className="fa fa-trash"  />
            </div>
            <img height={200} src={pic.url}/>
          </div>
        )
      })
    }

    return (
      <div>{photoNodes} {this._getCampaignPhotoDropzoneNode()}</div>
    );
  },

  _onSubmit(fields) {

    let {amount, name, description} = fields

    this.props.saveCampaign({amount, name, description});

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
