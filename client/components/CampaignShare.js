import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'
import { ColumnProps } from 'client/constants/Layout'

const colProps = ColumnProps.OneHundred

const CampaignShare = React.createClass({

  render() {

    let {campaign} = this.props

    return (
      <div className="campaign-share">

        <Row>
          <Col {...colProps} className="text-center">
            <h4>Shareable Link</h4>
            {this._getShareLink()}
            <br/>
            &nbsp;
          </Col>
          <Col {...colProps} className="text-center">
            <ShareButton
              onClick={() => {}}
              icon="facebook" />
            {/*<a href="sms:">
            </a>*/}
            <ShareButton
              onClick={() => {}}
              icon="envelope" />

            <ShareButton
              onClick={() => {}}
              icon="whatsapp" />
          </Col>
        </Row>

      </div>
    )

  },

  _getShareLink() {

    let loc = window.location,
    campaign = this.props.campaign;
    return loc.href;
  }

});

const ShareButton = ({onClick, icon}) => {
  return (
    <div
      className={`share-button share-button-${icon}`}
      onClick={onClick}><span className={`fa fa-2x fa-${icon}`} />
    </div>
  )
}



export default CampaignShare
