import React from 'react'
import Checkout from 'react-stripe-checkout'

export default ({onToken}) => {

  return (
    <Checkout
          token={onToken}
          name={"BuckBuddy"}
          image={"/static/img/buck.png"}
          stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh" />
  )

}
