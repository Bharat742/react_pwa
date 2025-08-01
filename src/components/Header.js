// src/Components/Header.js
import React from "react";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
  return (
    <>
    {/* // <nav className="navbar"> */}
      {/* <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
      <NavLink to="/testimonial" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Testimonial</NavLink> 
      <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
      <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Users</NavLink> */}

      <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        // <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>

        {/*  Toggle button for mobile */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/*  Collapsible Nav content */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/testimonial">Testimonial</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* // </nav> */}
    </>
  );
};

export default Header;
