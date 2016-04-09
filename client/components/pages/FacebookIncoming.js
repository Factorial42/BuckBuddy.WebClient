import React from 'react'
import { login } from 'client/actions'
import { connect } from 'react-redux'
import { Row, Col } from 'bootstrap'
import { Link } from 'react-router'

/**
 * This page will receive incoming requests post-Facebook OAuth flow
 *
 */
const FacebookIncomingPage = React.createClass({

  render() {

    return (
      <Row>
        <Col xs={12} className="text-center">
          OK todo something...(FB incoming..)
        </Col>
      </Row>
    )
  }
});


export default connect(null, {login})(FacebookIncomingPage)
