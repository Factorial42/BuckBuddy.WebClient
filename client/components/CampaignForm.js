import React, { Component, PropTypes } from 'react'
import { Row, Col, Input, Button } from 'bootstrap'
import { reduxForm } from 'redux-form'
export const fields = [
  'name',
  'amount',
  'description'
]

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
  } else if (Number(values.amount) > 1000000) {
    errors.amount = 'Sorry, you are asking for too much'
  }

  if (values.description) {
    if (values.description.length > 2000) {
      errors.description = 'Must be less than 2000 characters'
    }
  }

  return errors
}

const CampaignForm = (props) => {

  const {
    fields: {
      name,
      amount,
      description
    },
    colProps,
    showDescription,
    handleSubmit,
    resetForm,
    onSubmit,
    submitting,
    saveButtonText
  } = props

  let descriptionNode = null

  if (showDescription) {
    descriptionNode = (
      <div>
        <Row>
          <Col {...colProps} className="text-left">
            <label>Description</label>
          </Col>
        </Row>
        <Row>
          <Col {...colProps} className="text-center">
          <Input
            type="textarea"
            placeholder={'No description yet...'}
            {...description}
             />
            {description.touched && description.error && <div>{description.error}</div>}
          </Col>
        </Row>

      </div>
    )
  }


  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col {...colProps} className="text-left">
          <label>If I had</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-center">
          <Input type="text" placeholder="$40" {...amount}/>
          {amount.touched && amount.error && <div>{amount.error}</div>}
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-left">
          <label>I would</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps} className="text-center">
          <Input type="text" placeholder="buy a bus ticket to see my brother" {...name}/>
          {name.touched && name.error && <div>{name.error}</div>}
        </Col>
      </Row>
      {descriptionNode}

      <Row>
        <Col {...colProps} className="text-center">
          <Button type="submit"
            className="button-action button-blue">{saveButtonText}<span className="fa fa-arrow-right pull-right"/>
          </Button>
        </Col>
      </Row>
    </form>
  )

}

CampaignForm.defaultProps = {
  saveButtonText: 'Continue',
  colProps: {
    xs: 10,
    xsOffset: 1,
    md: 6,
    mdOffset: 3,
    sm: 8,
    smOffset: 2,
    lg: 4,
    lgOffset: 4,
    className: 'text-center'
  }
}

CampaignForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'campaign',
  fields,
  validate
})(CampaignForm)
