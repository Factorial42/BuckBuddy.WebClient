import React from 'react'
import { login } from 'client/actions'
import { connect } from 'react-redux'
import { Row, Col } from 'bootstrap'
import { Link } from 'react-router'

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
          <StripeButton onClick={this._handleStripeConnectClick} />
        </Col>
      </Row>
    )

  },

  _handleStripeConnectClick() {

    let clientId = window.stripeClientId;
    let stripeConnectEndpoint =  `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write`;

    window.location.href = stripeConnectEndpoint;


  }

});

const StripeButton = ({onClick}) => {
  return (
    <input
      onClick={onClick}
      type="image"
      id="myimage" src="/static/img/stripe-connect@2x.png" />
  )
}

export default connect(null, {login})(StripeConnectPage)
