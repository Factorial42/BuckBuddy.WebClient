import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import { redirectAuthedUsers } from 'client/actions/session'
import { setCampaignGoal } from 'client/actions/signup'

const LandingPage = React.createClass({

  render() {

    let colProps = {
      xs: 10,
      xsOffset: 1,
      md: 6,
      mdOffset: 3,
      sm: 8,
      smOffset: 2,
      lg: 4,
      lgOffset: 4,
      className: 'text-center'
    }

    return (
      <div className="page-landing">
        <Row>
          <Col {...colProps} className="text-left">
            <label>If I had</label>
          </Col>
        </Row>
        <Row>
          <Col {...colProps} className="text-center">
            <Input ref="txtCampaignTarget" type='text' placeholder={'$1000000'} />
          </Col>
        </Row>
        <Row>
          <Col {...colProps} className="text-left">
            <label>I would</label>
          </Col>
        </Row>
        <Row>
          <Col {...colProps} className="text-center">
            <Input ref="txtCampaignReason" type='text' placeholder={'Buy an Island'} />
          </Col>
        </Row>
        <Row>
          <Col {...colProps} className="text-center">
            <SubmitButton onClick={this._handleSubmitClick} />
          </Col>
        </Row>
      </div>
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
