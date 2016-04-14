import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import { redirectAuthedUsers } from 'client/actions/session'
import { setCampaignGoal } from 'client/actions/signup'

const LandingPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    return (
      <Row className="page-landing">
        <Col xs={12} className="text-left">
          <label>If I had</label>
        </Col>
        <Col xs={12} className="text-center">
          <Input ref="txtCampaignTarget" type='text' placeholder={'$1000000'} />
        </Col>
        <Col xs={12} className="text-left">
          <label>I would</label>
        </Col>
        <Col xs={12} className="text-center">
          <Input ref="txtCampaignReason" type='text' placeholder={'Buy an Island'} />
        </Col>
        <Col {...colProps}>
          <SubmitButton onClick={this._handleSubmitClick} />
        </Col>

      </Row>
    )

  },

  _handleSubmitClick() {

    let target = this.refs.txtCampaignTarget.getInputDOMNode().value;
    let reason = this.refs.txtCampaignReason.getInputDOMNode().value;

    this.props.setCampaignGoal(target, reason);

  },

  componentDidMount() {
    this.props.redirectAuthedUsers();
  }

});

const SubmitButton = ({onClick}) => {
  return (
    <Button className="button-action button-blue" onClick={onClick}>Continue<span className="fa fa-arrow-right pull-right"/></Button>
  )
}

export default connect(null, {redirectAuthedUsers, setCampaignGoal})(LandingPage)
