import React from 'react'
import { connect } from 'react-redux'
import {Grid} from 'bootstrap'
import Header from 'client/components/Header'
import LandingPage from 'client/components/pages/Landing'
import LoadingIndicator from 'client/components/LoadingIndicator'
//import Checkout from 'react-stripe-checkout'

const App = ({children, loading}) => (
  <Grid fluid>
    <Header />
    <div className="content">
      {loading ? <LoadingIndicator/> : null}
      {children || <LandingPage />}
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

//export default App

const mapStateToProps = (state) => {
  return {loading: state.loading}
}

export default connect(mapStateToProps, {})(App)
