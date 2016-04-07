import React from 'react'
import { login } from 'client/actions'
import { connect } from 'react-redux'
import { Input } from 'bootstrap'
import { Link } from 'react-router'

const ForgotPasswordPage = React.createClass({

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
          <h3>Forgotten Password</h3>
        </Col>
        <Col {...colProps}>
          <Input type='text' placeholder={'Email Address'} />
        </Col>
        <Col {...colProps}>
          <SubmitButton onClick={this._handleSubmitClick} />
        </Col>
      </Row>
    )

  },

  handleSubmitClick() {

  }

});

const SubmitButton = ({onClick}) => {
  return (
    <Button onClick={onClick}>Submit</Button>
  )
}

export default connect(null, {login})(ForgotPasswordPage)
