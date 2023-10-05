import { Link } from "react-router-dom";
import { Container, Nav, Navbar,NavDropdown } from "react-bootstrap";
import Mog from "../assets/photos/mogicon.png";



function Navigation({ view, setView }) {
  return (
    <Navbar
      style={{
        backgroundColor: "#034294",
      }}
      expand="lg"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container d-flex justify-content-between">
            <div className="d-lg-flex">
              <NavDropdown title="Games">
                <NavDropdown.Item as={Link} to="/game/1">
                  Final Fantasy I
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/game/2">
                  Final Fantasy II
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/game/3">
                  Final Fantasy III
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/game/4">
                  Final Fantasy IV
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/game/5">
                  Final Fantasy V
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/game/6">
                  Final Fantasy VI
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
            </div>

            <div>
              <Navbar.Brand as={Link} to="/">
                <img
                  src={Mog}
                  alt="Mog Icon"
                  height="30"
                  width="30"
                />
              </Navbar.Brand>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
