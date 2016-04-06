import React from 'react'
//import Header from 'app/components/stateless/Header'
import {Grid} from 'bootstrap'
import Checkout from 'react-stripe-checkout'

const App = () => (
  <Grid fluid>
  test..
    <Checkout
          token={() => {}}
          name={"BuckBuddy"}
          image={"/static/img/buck.png"}
          stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh" />
  </Grid>
)

export default App
