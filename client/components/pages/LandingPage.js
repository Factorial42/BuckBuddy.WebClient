import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import { redirectAuthedUsers } from 'client/actions/session'
import { setCampaignGoal } from 'client/actions/signup'
import CampaignForm from 'client/components/CampaignForm'

const LandingPage = React.createClass({

  render() {
    return (
      <div className="page-landing">
        <CampaignForm
          onSubmit={this._onSubmit}
          submitting={false}
          />
      </div>
    )

  },

  _onSubmit(fields) {

    let {amount, name} = fields

    this.props.setCampaignGoal(amount, name);

  },

  componentDidMount() {
    this.props.redirectAuthedUsers();
  }

});

export default connect(null, {redirectAuthedUsers, setCampaignGoal})(LandingPage)
