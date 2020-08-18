import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
var moment = require("moment");
moment().format();

export default function Navigation(props) {
  return (
    <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
      <Navbar.Brand href="#home">Internet Stock Picks – Work in Progress</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Select a Day" id="basic-nav-dropdown">
            <NavDropdown title={moment().startOf("isoWeek").format("MMMM Do YYYY")} id="basic-nav-dropdown">
              <NavDropdown.Item>
                {moment()
                  .subtract(4, "day")
                  .startOf("isoWeek")
                  .format("MMMM Do YYYY")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={moment()
              .subtract(1, "weeks")
              .startOf("isoWeek")
              .format("MMMM Do YYYY")} href="#action/3.2">
              <NavDropdown.Item>
                {moment()
                  .subtract(4, "day")
                  .startOf("isoWeek")
                  .format("MMMM Do YYYY")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={moment()
              .subtract(2, "weeks")
              .startOf("isoWeek")
              .format("MMMM Do YYYY")} href="#action/3.3">
              <NavDropdown.Item>
                {moment()
                  .subtract(4, "day")
                  .startOf("isoWeek")
                  .format("MMMM Do YYYY")}
              </NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>
          <Nav.Link href="#graph">Graph</Nav.Link>
          <Nav.Link href="#table">Table</Nav.Link>
          <Nav.Link href="#about-us">About us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
