import React from 'react'
import { login } from 'client/actions'
import { connect } from 'react-redux'
import { Row, Col } from 'bootstrap'
import { Link } from 'react-router'

const CampaignPage = React.createClass({

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
          TODO...campaign page...show create form or existing campaign if there is one...
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

export default connect(null, {login})(CampaignPage)
