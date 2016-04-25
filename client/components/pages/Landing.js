import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import { redirectAuthedUsers, fbLoginCheck } from 'client/actions/session'

import { ColumnProps } from 'client/constants/Layout'

const LandingPage = React.createClass({

  render() {
    return (
      <div className="page-landing">

        <Row>
          <Col {...ColumnProps.General}>

            <Link to="/campaign/start"><Button className="button-action button-green">Get Started</Button></Link>
            <br/>
            <Link to="/login"><Button className="button-action button-grey">Login</Button></Link>
            <br/>
            <Button onClick={e => this.props.fbLoginCheck()} className="button-action button-fb">Login FB</Button>

          </Col>
        </Row>
      </div>
    )
  },

  componentDidMount() {
    this.props.redirectAuthedUsers();
  }
});

export default connect(null, {redirectAuthedUsers, fbLoginCheck})(LandingPage)
