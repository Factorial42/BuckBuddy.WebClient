import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'
import { ColumnProps } from 'client/constants/Layout'
import { resolveFBHandle } from 'client/lib/fb'
import isMobile from 'client/lib/isMobile'
import isiOS from 'client/lib/isiOS'

const showMobileShareButtons = isMobile()
const usingiOS = isiOS()

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
              onClick={this._shareFb}
              icon="facebook" />
            {this._getSmsShareButton()}
            {this._getWhatsAppShareButton()}
          </Col>
        </Row>

      </div>
    )
  },

  _shareFb() {

    resolveFBHandle()
      .then($fb => {

        $fb.ui({
          method: 'share',
          href: this._getShareLink(),
        }, response => {

        });

      });

  },

  _getShareMessage() {
    return `Check it out: ${this._getShareLink()}`;
  },

  _getSmsShareButton() {

    if (!showMobileShareButtons) return null;

    let message = this._getShareMessage();
    let href = `sms:${usingiOS ? '&' : '?'}body=${message}`

    return (
      <a href={href}>
        <ShareButton
          onClick={() => {}}
          icon="envelope" />
      </a>
    )

  },

  _getWhatsAppShareButton() {
    if (!showMobileShareButtons) return null;

    return (
      <a href={`whatsapp://send?text=${this._getShareMessage()}`}>
        <ShareButton
          onClick={() => {}}
          icon="whatsapp" />
      </a>
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
