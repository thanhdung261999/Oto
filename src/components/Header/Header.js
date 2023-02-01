import './Header.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';
const Header = (props) => {
  const navigate = useNavigate();
  const isAuth = JSON.parse(window.localStorage.getItem('USER'))?.isAuth;
  const role = JSON.parse(window.localStorage.getItem('USER'))?.role;
  const [isAuthen, setIsAuthen] = useState(isAuth);
  const [isAdmin, setIsAdmin] = useState(role);
  const isMobileAndTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  const handleLogout = () => {
    props.setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        'USER',
        JSON.stringify({
          email: '',
          isAuth: false,
          role: '',
          username: '',
        }),
      );
    }, 2000);
    setTimeout(() => {
      props.setIsLoading(false);
    }, 2000);
    setIsAdmin('');
    setIsAuthen(false);
    navigate('/');
    toast.success('Success logout');
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" className="header-navbar">
        <div className={`${isMobileAndTablet ? 'container-mb-tb' : 'container'}`}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto header-content">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/card-for-sale" className="nav-link">
                Car For Sale
              </NavLink>

              {isAuth && isAdmin === 'Admin' && (
                <NavLink to="/manage" className="nav-link">
                  Manage
                </NavLink>
              )}
              <MediaQuery maxWidth={1023}>
                {isAuthen ? (
                  <>
                    <NavDropdown title="Settings" id="basic-n av-dropdown" className="drop-list">
                      <NavDropdown.Item className="st">Profile</NavDropdown.Item>
                      <NavDropdown.Item className="st" onClick={handleLogout}>
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="nav-link" onClick={() => {}}>
                      Log in
                    </NavLink>
                    <NavLink to="/register" className="nav-link">
                      Sign up
                    </NavLink>
                  </>
                )}
              </MediaQuery>
            </Nav>

            <MediaQuery minWidth={1024}>
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
                      navigate('/login');
                    }}
                  >
                    log in
                  </button>
                  <button
                    className="btn btn-warning btn-singup"
                    onClick={() => {
                      navigate('/register');
                    }}
                  >
                    sign up
                  </button>
                </Nav>
              )}
            </MediaQuery>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
