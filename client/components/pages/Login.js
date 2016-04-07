import React from 'react'
import ReactDOM from 'react-dom'
import { login } from 'client/actions/login'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'

const LoginPage = React.createClass({

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
          <h3>Login</h3>
        </Col>
        <Col {...colProps}>
          <Input ref="txtEmail" type='text' placeholder={'Email Address'} />
        </Col>
        <Col {...colProps}>
          <Input ref="txtPassword" type='password' placeholder={'Password'} />
        </Col>
        <Col {...colProps}>
          <Link to="/forgot">Forgot your password?</Link>
        </Col>
        <Col {...colProps}>
          <SubmitButton onClick={this._handleSubmitClick} />
        </Col>
      </Row>
    )

  },

  _handleSubmitClick() {

    let email = this.refs.txtEmail.getInputDOMNode().value;
    let password = this.refs.txtPassword.getInputDOMNode().value;

    this.props.login({email, password});

  }

});

const SubmitButton = ({onClick}) => {
  return (
    <Button onClick={onClick}>Login</Button>
  )
}

export default connect(null, {login})(LoginPage)
