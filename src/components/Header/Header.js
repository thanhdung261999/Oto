import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
const Header = (props) => {
  const navigate = useNavigate();
  const isAuth = JSON.parse(window.localStorage.getItem("USER"))?.isAuth;
  const role = JSON.parse(window.localStorage.getItem("USER"))?.role;
  const [isAuthen, setIsAuthen] = useState(isAuth);
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.setItem(
        "USER",
        JSON.stringify({
          email: "",
          isAuth: false,
          role: "",
          username: "",
        })
      );
    }, 2000);
    navigate("/");
    setIsAuthen(false);
    toast.success("Success logout");
  };
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
              <NavLink to="/card-for-sale" className="nav-link">
                Car For Sale
              </NavLink>
              {isAuth && role === "Admin" && (
                <NavLink to="/manage" className="nav-link">
                  Manage
                </NavLink>
              )}
            </Nav>

            {isAuthen ? (
              <NavDropdown title="Settings" id="basic-n av-dropdown">
                <NavDropdown.Item className="st">Profile</NavDropdown.Item>
                <NavDropdown.Item className="st" onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <button
                  className="btn btn-danger btn-login"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  log in
                </button>
                <button
                  className="btn btn-warning btn-singup"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  sign up
                </button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
