import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Navbarheader extends Component {
  render() {
    return (
        <Fragment>
        <Navbar color="faded" light expand="md">
          
          <Nav className="ml-auto" nav  bar>
          
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="#">
              Home
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Master
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Part
              </DropdownItem>
              <DropdownItem>
                Finished Good
              </DropdownItem>                
              <DropdownItem>
                Site
              </DropdownItem>
              <DropdownItem>
                Supplier
              </DropdownItem>                
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Procurement
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Request 
              </DropdownItem>
              <DropdownItem>
                Vendor Invoice
              </DropdownItem>                
              <DropdownItem>
                PO to Vendor
              </DropdownItem>
              <DropdownItem>
                Vendor Receipt
              </DropdownItem>                
              <DropdownItem divider />
              <DropdownItem>
                Cust. Order
              </DropdownItem>                
              <DropdownItem>
                Cust. Invoice
              </DropdownItem>                
              <DropdownItem>
                Cust. Receipt
              </DropdownItem>                
              <DropdownItem>
                Sent Item
              </DropdownItem>                
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Use and Mutation
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Form Use
              </DropdownItem>
              <DropdownItem>
                Form Mutation
              </DropdownItem>                
              <DropdownItem>
                Delivery Note
              </DropdownItem>              
            </DropdownMenu>
          </UncontrolledDropdown>

          </Nav>

          <NavbarBrand href="/">
            MIS
          </NavbarBrand>

        </Navbar>
      </Fragment>
    );
  }
}
export default Navbarheader;