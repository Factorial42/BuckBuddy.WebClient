import React, { Component, PropTypes } from 'react'
import { Row, Col, FormControl, Button, Form } from 'bootstrap'
import { Link } from 'react-router'
import { ColumnProps } from 'client/constants/Layout'
import { reduxForm } from 'redux-form'

const colProps = {
  xs: 12,
  lg: 12
}

const UserTransferForm = (props) => {

  const {
    fields: {
      dobDay,
      dobMonth,
      dobYear,
      firstName,
      lastName,
      accountCurrency,
      accountRoutingNumber,
      accountNumber,
      accountHolderName,
      accountHolderType
    },
    handleSubmit,
    resetForm,
    onSubmit,
    submitting
  } = props

  return (
    <Form inline onSubmit={handleSubmit}>
      <BirthDayInputRow
        dobDay={dobDay}
        dobMonth={dobMonth}
        dobYear={dobYear} />
      <br/>
      <NameInputRow
        firstName={firstName}
        lastName={lastName}/>
      <br/>
      <AccountInfoInputGroup
        accountCurrency={accountCurrency}
        accountRoutingNumber={accountRoutingNumber}
        accountNumber={accountNumber}
        accountHolderName={accountHolderName}
        accountHolderType={accountHolderType}
       />

       <Row>
         <Col {...colProps} className="text-center">
           <Button type="submit"
             className="button-action button-blue">Submit <span className="fa fa-arrow-right pull-right"/>
           </Button>
         </Col>
       </Row>

    </Form>
  )

}

const NameInputRow = ({firstName, lastName}) => {

  if (!firstName || !lastName) return null;

  return (
    <div>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Name</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl type="text" placeholder="John" {...firstName}/>
          <FormControl type="text" placeholder="Doe" {...lastName}/>
          {firstName.touched && firstName.error && <div>{firstName.error}</div>}
          {lastName.touched && lastName.error && <div>{lastName.error}</div>}
        </Col>
      </Row>
    </div>
  )

}

const AccountInfoInputGroup = ({
  accountCurrency,
  accountRoutingNumber,
  accountNumber,
  accountHolderName,
  accountHolderType
}) => {

  if (!accountNumber) return null;

  return (
    <div>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Account Currency</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl componentClass="select" placeholder="select" {...accountCurrency}>
            <option value="USD">USD</option>
          </FormControl>
          {accountCurrency.touched && accountCurrency.error && <div>{accountCurrency.error}</div>}
        </Col>
      </Row>
      <br/>

      <Row>
        <Col {...colProps} className="text-left">
        <label>Account Routing Number</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl type="text" placeholder="" {...accountRoutingNumber}/>
          {accountRoutingNumber.touched && accountRoutingNumber.error && <div>{accountRoutingNumber.error}</div>}
        </Col>
      </Row>
      <br/>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Account Number</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl type="text" placeholder="" {...accountNumber}/>
          {accountNumber.touched && accountNumber.error && <div>{accountNumber.error}</div>}
        </Col>
      </Row>
      <br/>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Account Holder Name</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl type="text" placeholder="" {...accountHolderName}/>
          {accountHolderName.touched && accountHolderName.error && <div>{accountHolderName.error}</div>}
        </Col>
      </Row>
      <br/>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Account Holder Type</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl componentClass="select" placeholder="select" {...accountHolderType}>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </FormControl>
          {accountHolderType.touched && accountHolderType.error && <div>{accountHolderType.error}</div>}
        </Col>
      </Row>
    </div>
  )

}

const BirthDayInputRow = ({dobDay, dobMonth, dobYear}) => {

  if (!dobDay || !dobMonth || !dobYear) return null;

  return (
    <div>
      <Row>
        <Col {...colProps} className="text-left">
        <label>Birthday</label>
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <FormControl size={2} type="text" placeholder="DD" {...dobMonth}/> /
          <FormControl size={2} type="text" placeholder="MM" {...dobDay}/> /
          <FormControl size={4} type="text" placeholder="YYYY" {...dobYear}/>
          {dobMonth.touched && dobMonth.error && <div>{dobMonth.error}</div>}
          {dobDay.touched && dobDay.error && <div>{dobDay.error}</div>}
          {dobYear.touched && dobYear.error && <div>{dobYear.error}</div>}
        </Col>
      </Row>
    </div>
  )
}

UserTransferForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'userTransferForm'
})(UserTransferForm)
