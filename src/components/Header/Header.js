import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <>
      <Navbar bg="dark" expand="lg" className="header-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto header-content">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/introduce" className="nav-link">
                Introduce
              </NavLink>
              <NavLink to="/card-for-sale" className="nav-link">
                Car For Sale
              </NavLink>
              <NavLink to="/manage" className="nav-link">
                Manage
              </NavLink>
            </Nav>
            <Nav>
              {/* <NavDropdown title="Settings" id="basic-n av-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              </NavDropdown> */}
              <button className="btn btn-danger btn-login">log in</button>
              <button className="btn btn-warning btn-singup">sign up</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
