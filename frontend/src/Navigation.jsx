import React, { Component } from 'react';
import './MainGraph.css';
import { Container, Navbar, Button, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap'
var moment = require('moment');
moment().format();



class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div classname="navigation">
                <header>
                    <Container>
                        <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
                            <Navbar.Brand href="#home">InternetStockPicker</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavDropdown title="Select a Week" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">{moment().startOf('isoWeek').format('MMMM Do YYYY')}</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">{moment().subtract(1, 'weeks').startOf('isoWeek').format('MMMM Do YYYY')}</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">{moment().subtract(2, 'weeks').startOf('isoWeek').format('MMMM Do YYYY')}</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                    <Nav.Link href="#home">Tables</Nav.Link>
                                    <Nav.Link href="#footer">About us</Nav.Link>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search $Ticker</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Container>
                </header>
            </div>

        )
    }

}

export default Navigation