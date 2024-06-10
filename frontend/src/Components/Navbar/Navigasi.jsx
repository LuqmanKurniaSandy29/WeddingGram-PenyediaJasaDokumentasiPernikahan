import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../../Asset/Logo.png";
import "../Navbar/Navigasi.css";

const Navigasi = () => {
  return (
    <Navbar expand="lg" bg="light" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            width="60"
            height="60"
            className="d-inline-block align-center"
            alt="WeddingGram Logo"
          />
          WeddingGram
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="mx-3" href="/#home">
              Home
            </Nav.Link>
            <Nav.Link className="mx-3" href="/#about">
              About
            </Nav.Link>
            <Nav.Link className="mx-3" href="/#services">
              Service
            </Nav.Link>
            <Nav.Link className="mx-3" href="/#contact">
              Contact
            </Nav.Link>
            <Nav.Link className="mx-3 d-block d-lg-none" href="/login" style={{ textDecoration: 'none' }}>
              Login
            </Nav.Link>
            <a href="/login" style={{ textDecoration: 'none' }}>
              <button
                className="custom-button py-2 px-3 fw-semibold d-none d-lg-block mx-3"
              >
                Login
              </button>
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigasi;
