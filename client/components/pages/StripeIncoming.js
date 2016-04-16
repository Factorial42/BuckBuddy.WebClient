import React from 'react'
import { setStripeConnection } from 'client/actions/signup'
import { connect } from 'react-redux'
import { Row, Col } from 'bootstrap'
import { Link } from 'react-router'

/**
 * This page will receive incoming requests post Stripe OAuth/Connect flow
 *
 */
const StripeIncomingPage = React.createClass({

  render() {

    return (
      <Row>
        <Col xs={12} className="text-center">
          Working...
        </Col>
      </Row>
    )
  },

  componentWillReceiveProps(nextProps) {

    if (nextProps.userId && !this.props.userId) {
      let { query } = this.props.location
      let { userId } = nextProps;

      if (query && query.code && userId) {
        this.props.setStripeConnection(userId, query.code);
      }
    }

  }
});

const mapStateToProps = (state) => {
  if (!state.user) return {};

  let userId = state.user.userId;
//console.log(userId)
  return {userId};
}


export default connect(mapStateToProps, {setStripeConnection})(StripeIncomingPage)
