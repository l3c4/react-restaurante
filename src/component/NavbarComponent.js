import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class NavbarComponent extends Component {
    render() {
        return (
          <Navbar bg="light"  variant="light">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Principal</Nav.Link>
                <Nav.Link href="/restaurante">Restaurantes</Nav.Link>
                <Nav.Link href="/prato">Pratos</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
    }
}

export default NavbarComponent
