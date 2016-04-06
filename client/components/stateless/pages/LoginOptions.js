import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'

export default function LoginOptionsPage() {
  return (
    <Row>
      <Col xs={12} className="text-center">
        <h3>Create an account</h3>
        <h5>Donec sit amet quam ac justo euismod vehicula. Ut enim nisl, aliquam eu libero sit amet, pellentesque sodales dui. </h5>
      </Col>
      <Col xs={12} lg={2} lgOffset={5} className="text-center">
        <FacebookButton />
      </Col>
      <Col xs={12} lg={2} lgOffset={5} className="text-center">
        <SignupButton />
      </Col>
      <Col xs={12} lg={2} lgOffset={5} className="text-center">
        <LoginButton />
      </Col>
    </Row>
  )
}

const LoginButton = () => {
  return (
    <Button>Log in with email</Button>
  )
}

const SignupButton = () => {
  return (
    <Button>Sign up with email</Button>
  )
}

const FacebookButton = () => {
  return (
    <Button>Connect with Facebook</Button>
  )
}
