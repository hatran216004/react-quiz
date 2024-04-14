import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo512.png";
import "./Header.scss";
const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary fixed">
            <Container>
                <NavLink to="/" className="navbar-brand me-3">
                    <img src={logo} alt="" className="logo" />
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link  ps-3 pe-3">
                            Home
                        </NavLink>
                        <NavLink to="/users" className="nav-link  ps-3 pe-3">
                            Users
                        </NavLink>
                        <NavLink to="/admin" className="nav-link  ps-3 pe-3">
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        <div className="header-actions">
                            <button className="btn-custom btn-outline">
                                Login
                            </button>
                            <button className="btn-custom btn-primary">
                                Sign up
                            </button>
                        </div>
                        {/* <NavDropdown title="Options" id="basic-nav-dropdown ">
                            <NavDropdown.Item>Login</NavDropdown.Item>
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
