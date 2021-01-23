import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Fragment } from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Navbarheader extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
        <Fragment>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/dashboard">
            MIS
          </NavbarBrand>
          <b>{user.Name}, </b> <a href="/logout"              
              onClick={this.onLogoutClick}
              className="btn tri-f-blue"
            >
              Logout
            </a>
          <Nav className="ml-auto" nav bar>
          
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="#">
              Dashboard
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Master
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/master/part">
                Part
              </DropdownItem>
              <DropdownItem href="/master/goods">
                Finished Good
              </DropdownItem>                
              <DropdownItem href="/master/site">
                Site
              </DropdownItem>
              <DropdownItem href="/master/supplier">
                Supplier
              </DropdownItem>                
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Procurement
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/purchasing/request">
                Request 
              </DropdownItem>
              <DropdownItem href="/purchasing/invoice">
                Vendor Invoice
              </DropdownItem>                
              <DropdownItem href="/purchasing/po">
                PO to Vendor
              </DropdownItem>
              <DropdownItem href="/purchasing/receipt">
                Vendor Receipt
              </DropdownItem>                
              <DropdownItem divider />
              <DropdownItem href="/sales/order">
                Cust. Order
              </DropdownItem>                
              <DropdownItem href="/sales/invoice">
                Cust. Invoice
              </DropdownItem>                
              <DropdownItem href="/sales/receipt">
                Cust. Receipt
              </DropdownItem>                
              <DropdownItem href="/sales/sentitem">
                Sent Item
              </DropdownItem>                
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Use and Mutation
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/request/use">
                Form Use
              </DropdownItem>
              <DropdownItem href="/request/mutation">
                Form Mutation
              </DropdownItem>                
              <DropdownItem href="/request/deliverynote">
                Delivery Note
              </DropdownItem>              
            </DropdownMenu>
          </UncontrolledDropdown>

          </Nav>

          

        </Navbar>
      </Fragment>
    );
  }
}

Navbarheader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbarheader);
//export default Navbarheader;