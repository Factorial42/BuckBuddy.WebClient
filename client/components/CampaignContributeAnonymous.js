import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button, Carousel } from 'bootstrap'
import { Link } from 'react-router'
import { ColumnProps } from 'client/constants/Layout'
import { reduxForm } from 'redux-form'
export const fields = [
  'name',
  'amount',
  'currency'
]

const colProps = ColumnProps.OneHundred

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 5) {
    errors.name = 'Must be more than 5 characters'
  }

  if (!values.amount) {
    errors.amount = 'Required'
  } else if (isNaN(Number(values.amount))) {
    errors.amount = 'Must be a number'
  } else if (Number(values.amount) > 1000) {
    errors.amount = 'Sorry, you are giving too much'
  }

  return errors
}

const CampaignContributeAnonymous = (props) => {

  const {
    fields: {
      name,
      amount,
      currency
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
        <Col {...colProps} className="text-left">
        <label>Amount</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-center">
          <Input type="text" placeholder="How much" {...amount}/>
          {amount.touched && amount.error && <div>{amount.error}</div>}
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Currency</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-left">
          <select {...currency}>
            <option>USD</option>
            <option>CSD</option>
          </select>
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
