import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'
import { ColumnProps } from 'client/constants/Layout'
import { reduxForm } from 'redux-form'
export const fields = [
  'name'
]

const colProps = ColumnProps.OneHundred

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 5) {
    errors.name = 'Must be more than 5 characters'
  }

  return errors
}

const CampaignContributeAnonymous = (props) => {

  const {
    fields: {
      name
    },
    handleSubmit,
    resetForm,
    onSubmit,
    submitting
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Name</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-center">
          <Input type="text" placeholder="Your Name" {...name}/>
          {name.touched && name.error && <div>{name.error}</div>}
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-center">
          <Button type="submit"
            className="button-action button-blue">Proceed <span className="fa fa-arrow-right pull-right"/>
          </Button>
        </Col>
      </Row>

    </form>
  )

}

CampaignContributeAnonymous.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'campaignContribute',
  fields,
  validate
})(CampaignContributeAnonymous)
