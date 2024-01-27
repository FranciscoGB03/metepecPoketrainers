import { Container, Nav, Navbar } from "react-bootstrap";
import { AiOutlinePicture } from "react-icons/ai";

import "./NavbarStruct.css";

const NavbarStruct = () => {
  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className="nav-color">
      <Container fluid>
        <Navbar.Brand className="nav-container" href="#home">
          <AiOutlinePicture />
          <span className="ms-1">Metepec Poke Trainers</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#deets">Ranking Mundial</Nav.Link>
            <Nav.Link href="#deets">Ranking Local</Nav.Link>
            <Nav.Link href="#deets">Equipos Top</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarStruct;
