import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import DatePicker from 'react-datepicker';
var moment = require("moment");
moment().format();

export default function Navigation(props) {
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
      <Navbar.Brand href="#home">Internet Stock Picks – Work in Progress</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Select a Day" id="basic-nav-dropdown">
            <DatePicker selected={startDate} onChange = {date => setStartDate(date)}/>
          </NavDropdown>
          <Nav.Link href="#graph">Graph</Nav.Link>
          <Nav.Link href="#table">Table</Nav.Link>
          <Nav.Link href="#about-us">About us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
