import { Link } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import "../assets/css/main.css";



function Navigation({ view, setView }) {
  return (
    <Navbar
      style={{
        backgroundColor: "#034294",
      }}
      expand="lg"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              style={{
                backgroundColor: "#034294",
                border: "none",
                boxShadow: "none",
                fontSize: '33px',
              }}
            >
              Games
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/game/1">
                Final Fantasy I
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/game/2">
                Final Fantasy II
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/game/3">
                Final Fantasy III
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/game/4">
                Final Fantasy IV
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/game/5">
                Final Fantasy V
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/game/6">
                Final Fantasy VI
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link
            as={Link}
            to="/about"
          >
            About Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
