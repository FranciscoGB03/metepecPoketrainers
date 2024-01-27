import { Container, Nav, Navbar } from "react-bootstrap";
import { AiOutlinePicture } from "react-icons/ai";

import "./NavbarStruct.css";
import { NavLink } from "react-router-dom";

const NavbarStruct = () => {
  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className="nav-color">
      <Container fluid>
        <Navbar.Brand className="nav-container" href="/metepecPokeTrainers">
          <AiOutlinePicture />
          <span className="ms-1">Metepec Poke Trainers</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavLink to="/rankingMundial">Ranking Mundial</NavLink>
            <NavLink to="/rankingRegional">Ranking Local</NavLink>
            <NavLink href="#deets">Equipos Top</NavLink>
            <NavLink eventKey={2} href="#memes">             
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarStruct;
