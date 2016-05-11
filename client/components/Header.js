import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  DropdownButton,
  Grid
} from 'bootstrap'

import UserTransferModal from 'client/components/UserTransferModal'
import { logout } from 'client/actions/session'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  startSharingCampaign
} from 'client/actions/campaign'

let Header = React.createClass({

  render() {
    let settingsNode = null;

    let{
      logout,
      startTransferringFunds,
      authenticated
    } = this.props

    if (authenticated) {

      let cog = (<span className="fa fa-2x fa-gear"/>)

      settingsNode = (
        <DropdownButton title={cog} className="nav-menu-dropdown">
          <MenuItem eventKey="1">Settings</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={2} href="#" onClick={() => logout()}>Logout</MenuItem>
        </DropdownButton>

      )
    }

    let shareNode = null;

    if (this.props.shareable) {
      shareNode = (
        <span
          onClick={e => this.props.startSharingCampaign()}
          className="fa fa-2x fa-share"
          style={{paddingTop: 5}}/>
      )
    }

    return (

      <header>
        <Grid>
          <div className="pull-left">
            {settingsNode}
          </div>

          <div className="pull-right">
            {shareNode}
          </div>
          <UserTransferModal />
        </Grid>


      </header>

    )
  }

});

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    shareable: state.routing.locationBeforeTransitions.pathname.indexOf("/c/") >= 0
  }
}

export default connect(mapStateToProps, {
  logout,
  startSharingCampaign
})(Header)
