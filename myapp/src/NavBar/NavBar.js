import {
  MDBCollapse,
  MDBFormInline,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
import React from "react";

export default function NavBar() {
  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Employee Management System</strong>
      </MDBNavbarBrand>
      <MDBCollapse id="navbarCollapse3" navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/upload">Upload</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/query">Query</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBFormInline waves>
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </MDBFormInline>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}
