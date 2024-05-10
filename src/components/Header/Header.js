import './Header.scss';
import logo from '../../assets/img/logo512.png';
import { postLogout } from '../../services/apiServices';
import { doLogout } from '../../redux/action/userAction';
import Languages from './Languages';
import ModalProfileUser from '../Profile/ModalProfileUser';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CiBellOn, CiChat2 } from 'react-icons/ci';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // stateRedux => call Reducer => state reducer
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [showModalProfile, setShowModalProfile] = useState(false);

    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            localStorage.removeItem('persist:root');
            toast.success(res.EM);
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className="navbar-brand">
                        <img src={logo} alt="" className="logo" />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link  ps-3 pe-3">
                                Home
                            </NavLink>
                            {account.role === 'USER' || account.role === 'ADMIN' ? (
                                <NavLink to="/users" className="nav-link  ps-3 pe-3">
                                    Users
                                </NavLink>
                            ) : (
                                <></>
                            )}
                            {account.role === 'ADMIN' && (
                                <NavLink to="/admin" className="nav-link  ps-3 pe-3">
                                    Admin
                                </NavLink>
                            )}
                        </Nav>

                        <Nav>
                            {!isAuthenticated ? (
                                <div className="header-actions">
                                    <button className="btn-custom btn-outline" onClick={() => navigate('/login')}>
                                        Login
                                    </button>
                                    <button className="btn-custom btn-primary" onClick={() => navigate('/signup')}>
                                        Sign Up
                                    </button>
                                </div>
                            ) : (
                                <div className="header-actions">
                                    <Languages noMargin />
                                    <CiBellOn className="dashboard-actions-icon" />
                                    <CiChat2 className="dashboard-actions-icon" />
                                    <NavDropdown
                                        active={false}
                                        title={
                                            <img
                                                src={`data:image/jpeg;base64,${account.image}`}
                                                alt=""
                                                className="user-img"
                                            />
                                        }
                                        id="basic-nav-dropdown "
                                    >
                                        <NavDropdown.Item onClick={() => setShowModalProfile(true)}>
                                            <FaRegUser className="header-actions-icon" />
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogout}>
                                            <IoIosLogOut size="1.5rem" />
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalProfileUser show={showModalProfile} setShow={setShowModalProfile} />
        </>
    );
};

export default Header;
