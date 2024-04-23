import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo512.png";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
    const [active, setActive] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // stateRedux => call Reducer => state reducer
    const account = useSelector((state) => state.user.account);

    console.log("account: ", account);
    console.log("isAuthenticated: ", isAuthenticated);

    let navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary fixed pt-2 pb-2">
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
                        {!isAuthenticated ? (
                            <div className="header-actions">
                                <button
                                    className="btn-custom btn-outline"
                                    onClick={() => handleLogin()}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn-custom btn-primary"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign Up
                                </button>
                            </div>
                        ) : (
                            <NavDropdown
                                title="Options"
                                id="basic-nav-dropdown "
                                active={active}
                                onClick={() => setActive(!active)}
                                onBlur={() => setActive(false)}
                            >
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
