import React from 'react'
import ReactDOM from 'react-dom'
import { signupFb } from 'client/actions/signup'
import { redirectAuthedUsers } from 'client/actions/session'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'

const SignupPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    let {defaultName, defaultEmail} = this.props;

    return (
      <Row>
        <Col xs={12} className="text-center">
          <h3>Create an account</h3>
        </Col>
        <Col {...colProps}>
          <Input ref="txtName" type='text' placeholder={'Jane Smith'} defaultValue={defaultName} />
        </Col>
        <Col {...colProps}>
          <Input ref="txtEmail" type='text' placeholder={'Email Address'} defaultValue={defaultEmail} />
        </Col>
        <Col {...colProps}>
          <SubmitButton onClick={this._handleSubmitClick} />
        </Col>
      </Row>
    )

  },

  _handleSubmitClick() {

    let name = this.refs.txtName.getInputDOMNode().value;
    let email = this.refs.txtEmail.getInputDOMNode().value;

    this.props.signupFb({name, email, fbToken: this.props.fbToken});

  },

  componentDidMount() {
    this.props.redirectAuthedUsers();
  }

});

const SubmitButton = ({onClick}) => {
  return (
    <Button onClick={onClick} className="button-action button-blue">Continue</Button>
  )
}

const mapStateToProps = (state) => {

  let {signupFbToken, signupSuggestedValues} = state;

  return {
    fbToken: signupFbToken,
    defaultEmail: signupSuggestedValues ? signupSuggestedValues.suggestedEmail : null,
    defaultName: signupSuggestedValues ? signupSuggestedValues.suggestedName : null
  };
}

export default connect(mapStateToProps, {signupFb, redirectAuthedUsers})(SignupPage)
