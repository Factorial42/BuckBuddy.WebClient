import React from 'react'
import Checkout from 'react-stripe-checkout'

export default ({ onToken, amount }) => {

  return (
    <Checkout
      amount={amount * 100}
      token={onToken}
      name={"BuckBuddy"}
      image={"/static/img/buck.png"}
      stripeKey={window.stripeKey} />
  )

}
