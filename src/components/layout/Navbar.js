import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

class Navbarheader extends Component {
  render() {
    return (
        <Fragment>
        <Navbar color="faded" light expand="md">

          <NavbarBrand href="/">
            MIS
          </NavbarBrand>
          <Nav className="ml-auto" navbar>

            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="/">Home</NavLink>
            </NavItem>
            <NavItem className="d-flex align-items-center">
              <NavLink className="font-weight-bold" href="#">
                Home
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}
export default Navbarheader;