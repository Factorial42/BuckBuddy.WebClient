import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button, Modal } from 'bootstrap'
import UserTransferForm from 'client/components/UserTransferForm'

import {
  cancelTransferringFunds,
  saveTransferFields,
  transferFunds
} from 'client/actions/user'

const fieldMap = {
      "legal_entity.dob.day": "dobDay",
      "legal_entity.dob.month": "dobMonth",
      "legal_entity.dob.year": "dobYear",
      "legal_entity.first_name": "firstName",
      "legal_entity.last_name": "lastName",
      "legal_entity.address.line1": "addressLine1",
      "legal_entity.address.city": "addressCity",
      "legal_entity.address.postal_code": "addressPostalCode",
      "legal_entity.address.state": "addressState",
      "legal_entity.ssn.last_4": "ssnLast4"
    }

const UserTransferModal = React.createClass({

  render() {

    let {
      user,
      cancelTransferringFunds,
      userRequiredTransferFieldsErrors,
      userCanTransfer
    } = this.props

    let modalContent = this._getUserTransferFormNode()

    if (userCanTransfer) {
      modalContent = this._getTransferAvailableNode()
    }

    return (
      <Modal show={this.props.userTransferring} onHide={e => cancelTransferringFunds()}>
        <Modal.Header closeButton>
          <Modal.Title>Cash Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent}
        </Modal.Body>
      </Modal>    )

  },

  _getUserTransferFormNode() {

    let {
      userRequiredTransferFields,
      userRequiredTransferFieldsErrors
    } = this.props

    let mappedFields = this._getTransferFormFields(userRequiredTransferFields)
    let validateFunction = this._getTransferFormValidationFunction(mappedFields)

    return (
      <div>
        <UserTransferForm
          asyncErrors={userRequiredTransferFieldsErrors}
          initialValues={{accountHolderType: 'individual'}}
          onSubmit={this._handleFieldsSave}
          fields={mappedFields}
          validate={validateFunction} />
      </div>
    )

  },

  _handleFieldsSave(fields) {

    let reverseMappedFields = {};

    Object.keys(fieldMap).forEach((key) => {
      let fieldKey = fieldMap[key]
      if (fields[fieldKey]) {
        reverseMappedFields[key] = fields[fieldKey];
        delete fields[fieldKey]
      }
    })

    this.props.saveTransferFields(reverseMappedFields, fields)

  },

  _getTransferFormFields(fields) {

    let mappedFields = []
    fields.forEach(v => {
      if (!fieldMap[v]) return;
      mappedFields.push(fieldMap[v])
    });


    if (fields.indexOf('external_account') >= 0) {

      mappedFields.push('accountCurrency');
      mappedFields.push('accountRoutingNumber');
      mappedFields.push('accountNumber');
      mappedFields.push('accountHolderName');
      mappedFields.push('accountHolderType');

    }

    return mappedFields;

  },

  _getTransferFormValidationFunction(mappedFields) {

    return values => {
      const errors = {}

      if (mappedFields.indexOf('dobDay') >= 0) {
        if (!values.dobDay) {
          errors.dobDay = 'Required'
        } else if (isNaN(Number(values.dobDay))) {
          errors.dobDay = 'Must be a number'
        } else if (values.dobDay > 31 || values.dobDay < 1) {
          errors.dobDay = 'DOB day must be between 1-31'
        }

        if (!values.dobMonth) {
          errors.dobMonth = 'Required'
        } else if (isNaN(Number(values.dobMonth))) {
          errors.dobMonth = 'Must be a number'
        } else if (values.dobMonth > 12 || values.dobMonth < 1) {
          errors.dobMonth = 'Must be between 1-12'
        }

        if (!values.dobYear) {
          errors.dobYear = 'Required'
        } else if (isNaN(Number(values.dobYear))) {
          errors.dobYear = 'Must be a number'
        } else if (values.dobYear > 9999) { //TODO: make this validation better
          errors.dobDay = 'Must 4 digits'
        }
      }

      if (mappedFields.indexOf('firstName') >= 0) {
        if (!values.firstName) {
          errors.firstName = 'Required'
        } else if (values.firstName.length < 3) {
          errors.firstName = 'Must be more than 2 characters'
        }
      }

      if (mappedFields.indexOf('lastName') >= 0) {
        if (!values.lastName) {
          errors.lastName = 'Required'
        } else if (values.lastName.length < 3) {
          errors.lastName = 'Must be more than 2 characters'
        }
      }

      if (!values.accountNumber) {
        errors.accountNumber = 'Required'
      }

      if (!values.accountRoutingNumber) {
        errors.accountRoutingNumber = 'Required'
      }

      if (!values.accountHolderName) {
        errors.accountHolderName = 'Required'
      }

      if (!values.accountHolderType) {
        errors.accountHolderType = 'Required'
      }

      return errors
    }

  },

  _getTransferAvailableNode() {

    console.log(this.props)

    let {
      userCashBalances: {
        livemode,
        pending: [pendingBalanceInfo],
        available: [availableBalanceInfo]
      },
      transferFunds
    } = this.props

    let liveNodeWarningNode = null

    if (!livemode) {
      liveNodeWarningNode = (
        <div>
          Live Mode is Off :)
        </div>
      )
    }

    let buttonNode = null;

    if (availableBalanceInfo.amount > 0) {
      buttonNode = (
        <Button type="submit"
          onClick={e => transferFunds(availableBalanceInfo.amount)}
          className="button-action button-green">Cashout Available Balance
        </Button>
      )
    }

    return (
      <div className="text-center">

        {liveNodeWarningNode}

        <div>
          Pending Amount: {pendingBalanceInfo.amount / 100} {pendingBalanceInfo.currency}
        </div>

        <div>
          Available Amount: {availableBalanceInfo.amount / 100} {availableBalanceInfo.currency}
        </div>

        {buttonNode}

      </div>
    )
  }

})

const mapStateToProps = state => {

  let {
    user,
    userTransferring,
    userCanTransfer,
    userRequiredTransferFields,
    userRequiredTransferFieldsErrors,
    userCashBalances
  } = state;

  return {
    user,
    userTransferring,
    userCanTransfer,
    userRequiredTransferFields,
    userRequiredTransferFieldsErrors,
    userCashBalances
  }

}

export default connect(mapStateToProps, {
  cancelTransferringFunds,
  saveTransferFields,
  transferFunds
})(UserTransferModal)
