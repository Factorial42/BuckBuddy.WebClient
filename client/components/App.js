import React from 'react'
import {Grid} from 'bootstrap'
import Header from 'client/components/Header'
//import Checkout from 'react-stripe-checkout'

const App = ({children}) => (
  <Grid fluid>
    <Header />
    <div className="content">
      {children || 'TODO...landing page component'}
    </div>
    {/*

      <Checkout
            token={() => {}}
            name={"BuckBuddy"}
            image={"/static/img/buck.png"}
            stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh" />
    */}
  </Grid>
)

export default App
