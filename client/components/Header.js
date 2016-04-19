import React from 'react'
import { Navbar, Nav, NavItem, MenuItem, DropdownButton  } from 'bootstrap'
import { logout } from 'client/actions/session'
import { connect } from 'react-redux'
import { Link } from 'react-router'

let Header = React.createClass({

  render() {
    let settingsNode = null;

    if (this.props.authenticated) {

      let cog = (<span className="fa fa-2x fa-gear"/>)

      settingsNode = (
        <DropdownButton title={cog} className="nav-menu-dropdown">
          <MenuItem eventKey="1">Settings</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={2} href="#" onClick={() => this.props.logout()}>Logout</MenuItem>
        </DropdownButton>

      )
    }

    let shareNode = null;

    if (this.props.shareable) {
      shareNode = (
        <NavItem className="pull-right"><span className="fa fa-share"/></NavItem>
      )
    }

    return (

      <Navbar>
        <Nav>
          {settingsNode}
        </Nav>
        <Nav pullRight>
          {shareNode}
        </Nav>
     </Navbar>
    )
  }

});

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    shareable: state.routing.locationBeforeTransitions.pathname.indexOf("/campaign") >= 0
  }
}

export default connect(mapStateToProps, {logout})(Header)
