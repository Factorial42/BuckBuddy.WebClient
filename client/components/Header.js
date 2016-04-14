import React from 'react'
import { Navbar, Nav, NavItem, MenuItem  } from 'bootstrap'
import { logout } from 'client/actions/session'
import { connect } from 'react-redux'

let Header = React.createClass({

  render() {
    let logoutNode = null;

    if (this.props.authenticated) {
      logoutNode = (
        <NavItem eventKey={2} href="#" onClick={() => this.props.logout()}>Logout</NavItem>
      );
    }

    return (

      <Navbar inverse>
       <Navbar.Header>
         <Navbar.Brand>
           <img src="/static/img/buck.png" />
         </Navbar.Brand>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Nav>
           {/*<NavItem eventKey={1} href="#">Link</NavItem>
           <NavItem eventKey={2} href="#">Link</NavItem>*/}
           {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
             <MenuItem eventKey={3.1}>Action</MenuItem>
             <MenuItem eventKey={3.2}>Another action</MenuItem>
             <MenuItem eventKey={3.3}>Something else here</MenuItem>
             <MenuItem divider />
             <MenuItem eventKey={3.3}>Separated link</MenuItem>
           </NavDropdown>*/}
         </Nav>
         <Nav pullRight>
           {logoutNode}
         </Nav>
       </Navbar.Collapse>
     </Navbar>
    )




  }

});

// const Header = ({logout}) => {
//
//   let logoutNode = null;
//
//
//
//   return (
//
//     <Navbar inverse>
//      <Navbar.Header>
//        <Navbar.Brand>
//          <img src="/static/img/buck.png" />
//        </Navbar.Brand>
//        <Navbar.Toggle />
//      </Navbar.Header>
//      <Navbar.Collapse>
//        <Nav>
//          <NavItem eventKey={1} href="#">Link</NavItem>
//          <NavItem eventKey={2} href="#">Link</NavItem>
//          {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//            <MenuItem eventKey={3.1}>Action</MenuItem>
//            <MenuItem eventKey={3.2}>Another action</MenuItem>
//            <MenuItem eventKey={3.3}>Something else here</MenuItem>
//            <MenuItem divider />
//            <MenuItem eventKey={3.3}>Separated link</MenuItem>
//          </NavDropdown>*/}
//        </Nav>
//        <Nav pullRight>
//          <NavItem eventKey={2} href="#" onClick={() => logout()}>Logout</NavItem>
//        </Nav>
//      </Navbar.Collapse>
//    </Navbar>
//   )
//
// }

const mapStateToProps = ({authenticated}) => {
  return {authenticated}
}

export default connect(mapStateToProps, {logout})(Header)
