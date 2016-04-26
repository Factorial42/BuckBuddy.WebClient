import React from 'react'
import ReactDOM from 'react-dom'
import { activate } from 'client/actions/signup'
import { goToCampaign } from 'client/actions/campaign'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'

import { ColumnProps } from 'client/constants/Layout'
const colProps = ColumnProps.General

const SignupActivatePage = React.createClass({

  render() {

    if (this.props.loading) {
      return <span>Loading...</span>
    }

    return (
      <Row>
        <Col {...colProps}>
          You have been activated!
        </Col>
        <Col {...colProps}>
          <SubmitButton onClick={e => this.props.goToCampaign()} />
        </Col>
      </Row>
    )

  },

  componentDidMount() {

    this.props.activate(this.props.params.token)

  }

});

const SubmitButton = ({onClick}) => {
  return (
    <Button onClick={onClick} className="button-action button-blue">OK</Button>
  )
}

const mapStateToProps = state => {

  if (!state.activate) {
    return {
      loading: true
    }
  }


  return {
    activated: state.activate
  };

}
export default connect(mapStateToProps, {activate, goToCampaign})(SignupActivatePage)
