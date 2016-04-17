import React from 'react'
import ReactDOM from 'react-dom'
//import { setPhoto } from 'client/actions/signup'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import { startEditingCampaign, cancelEditingCampaign, saveCampaign } from 'client/actions/campaign'
import Dropzone from 'react-dropzone'
import UserPhoto from 'client/components/UserPhoto'

const CampaignPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    if (this.props.loading) return <span>Loading...</span>

    return (
      <Row>
        <Col {...colProps}>

          <UserPhoto {...this.props} />

        </Col>
        <Col xs={12} className="text-center">
          If I had...
          I would...
        </Col>

        <Col xs={12} className="text-center">
          {this._getEditCampaignButtonNode()}
        </Col>
      </Row>
    )

  },

  _getSaveCampaignButtonNode() {

    return (
      <SaveButton onClick={this._handleSaveClick} />
    )

  },

  _handleSaveClick() {

    //TODO...

    //this.props.saveCampaign();

  },

  _getEditCampaignButtonNode() {

    return (
      <a onClick={this._handleEditClick}>Edit campaign</a>
    );

  },

  _handleEditClick() {

    this.props.startEditingCampaign()

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
  let {editingCampaign, campaign} = state

  return {userId, profilePic, editingCampaign, campaign};

}

const setPhoto = () => console.log('TODO....add handler')

export default connect(mapStateToProps, {
  setPhoto,
  startEditingCampaign,
  cancelEditingCampaign,
  saveCampaign
})(CampaignPage)
