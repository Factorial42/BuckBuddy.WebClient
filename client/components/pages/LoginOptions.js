import React from 'react'
import { Row, Col, Button } from 'bootstrap'
import { Link } from 'react-router'


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
    <Link to="/login"><Button>Log in with email</Button></Link>
  )
}

const SignupButton = () => {
  return (
    <Link to="/signup"><Button>Sign up with email</Button></Link>
  )
}

const FacebookButton = () => {
  return (
    <Button>Connect with Facebook</Button>
  )
}