import React from 'react'
import { login } from 'client/actions'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'bootstrap'
import { Link } from 'react-router'

/**
 * This page is where users kick off the Stripe Connect (standalone account) flow
 *
 */
const StripeConnectPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    return (
      <Row>
        <Col xs={12} className="text-center">
          Donec sit amet quam ac justo euismod vehicula. Ut enim nisl, aliquam eu libero sit amet, pellentesque sodales dui.
        </Col>
        <Col xs={12} className="text-center">
          <StripeButton onClick={this._handleStripeConnectClick} />
        </Col>
      </Row>
    )

  },

  _handleStripeConnectClick() {

    let clientId = window.stripeClientId;
    let stripeRedirectUrl = window.stripeRedirectUrl;
    let stripeConnectEndpoint =
      `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&redirect_uri=${stripeRedirectUrl}`;

    window.location.href = stripeConnectEndpoint;

  }

});

const StripeButton = ({onClick}) => {
  return (
    <Button
      className="button-action button-blue"
      onClick={onClick}>Connect to Stripe</Button>
  )
}

export default connect(null, {login})(StripeConnectPage)
