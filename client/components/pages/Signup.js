import React from 'react'
import ReactDOM from 'react-dom'
import { signup } from 'client/actions/signup'
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

    return (
      <Row>
        <Col xs={12} className="text-center">
          <h3>Create an account</h3>
        </Col>
        <Col {...colProps}>
          <Input ref="txtName" type='text' placeholder={'Jane Smith'} />
        </Col>
        <Col {...colProps}>
          <Input ref="txtEmail" type='text' placeholder={'Email Address'} />
        </Col>
        <Col {...colProps}>
          <Input ref="txtPassword" type='password' placeholder={'Password'} />
        </Col>
        <Col {...colProps}>
          <Input ref="txtPasswordConfirm" type='password' placeholder={'Password Confirm'} />
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
    let password = this.refs.txtPassword.getInputDOMNode().value;
    let passwordConfirm = this.refs.txtPasswordConfirm.getInputDOMNode().value;

    //TODO: verify pass match

    this.props.signup({firstName: name, lastName: name, email, password});

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

export default connect(null, {signup, redirectAuthedUsers})(SignupPage)
