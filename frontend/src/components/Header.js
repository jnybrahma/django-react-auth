import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";




function Header() {
    return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
        <Container>
          <LinkContainer to="/login">
            <Navbar.Brand>
              <h4 style={{color: 'red' }}>User Authentication</h4>
            </Navbar.Brand>
          </LinkContainer>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
         
      </Container>
    </Navbar>
    </header>
  );
}
export default Header;
