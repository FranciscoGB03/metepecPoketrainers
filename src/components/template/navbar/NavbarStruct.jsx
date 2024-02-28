import { Container, Nav, Navbar } from "react-bootstrap";
import { AiOutlinePicture } from "react-icons/ai";

import "./NavbarStruct.css";
import { NavLink } from "react-router-dom";

const NavbarStruct = () => {
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" data-bs-theme="dark" className="nav-color">
      <Container fluid>
        <NavLink className="nav-container" to="/">
          <AiOutlinePicture />
          <span className="ms-1">Metepec Poke Trainers</span>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="right-menu">
            <NavLink to="/rankingMundial">Ranking Mundial</NavLink>
            <NavLink to="/rankingRegional">Ranking Local</NavLink>
            <NavLink href="#deets">Equipos Top</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarStruct;
