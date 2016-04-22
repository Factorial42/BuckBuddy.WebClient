import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import UserPhoto from 'client/components/UserPhoto'

const SignupPhotoPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    if (this.props.loading) return <span>Loading...</span>

    return (
      <Row>
        <Col xs={12} className="text-center">
          <h3>Add Your Photo</h3>
        </Col>
        <Col {...colProps}>

          <UserPhoto {...this.props} />

          <Link to="/signup/stripe/tos">
            <Button
              className="button-action button-blue">Continue</Button>
          </Link>

        </Col>
      </Row>
    )

  }
});

const mapStateToProps = state => {

  if (!state.user) {
    return {
      loading: true
    }
  }

  return {
    loading: false
  }

}

export default connect(mapStateToProps, {})(SignupPhotoPage)
