import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import {
  signupStripe
} from 'client/actions/signup'

import { ColumnProps } from 'client/constants/Layout'

const StripeTOSPage = React.createClass({

  render() {
    return (
      <div className="page-landing">

        <Row>
          <Col {...ColumnProps.General}>

            <h3>Stripe Terms of Service</h3>

            Payment processing services for [account holder term, e.g. drivers or sellers] on [platform name] are provided by Stripe and are subject to the Stripe Connected Account Agreement, which includes the Stripe Terms of Service (collectively, the “Stripe Services Agreement”).
            By agreeing to [this agreement / these terms / etc.] or continuing to operate as a [account holder term] on [platform name], you agree to be bound by the Stripe Services Agreement, as the same may be modified by Stripe from time to time. As a condition of [platform name] enabling payment processing services through Stripe, you agree to provide [platform name] accurate and complete information about you and your business, and you authorize [platform name] to share it and transaction information related to your use of the payment processing services provided by Stripe.

            <br/>
            <br/>

            <Button onClick={e => this.props.signupStripe()} className="button-action button-grey">Agree and Continue</Button>


          </Col>
        </Row>
      </div>
    )
  }
});

export default connect(null, {signupStripe})(StripeTOSPage)
