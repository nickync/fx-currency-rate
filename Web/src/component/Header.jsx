import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const aboutPage = () => {
    navigate('/about')
  }


  return (
    <Navbar className="py-0 fixed-top bg-gradient" bg="success" expand="lg">
      <Container className="d-flex flex-md-row-reverse">
       <Navbar.Brand className="mx-auto fw-bold text-warning" href="/">FX currency finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-5">
            <Nav.Link className="text-light" href="/">Home</Nav.Link>
            <Nav.Link className="text-light" onClick={aboutPage}>About this site</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}