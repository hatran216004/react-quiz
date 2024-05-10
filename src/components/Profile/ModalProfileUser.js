import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import QuizHistory from './QuizHistory';
import { useState } from 'react';

const ModalProfileUser = ({ show, setShow }) => {
    const [menu, setMenu] = useState('profile');

    const handleClose = () => {
        setShow(false);
        setMenu('profile');
    };

    const handleSize = () => {
        switch (menu) {
            case 'profile':
                return '';
            case 'changePassword':
                return '';
            case 'history':
                return 'xl';
            default:
                return '';
        }
    };

    const handleSelect = (key) => {
        if (key === 'profile') setMenu('profile');
        if (key === 'password') setMenu('changePassword');
        if (key === 'history') setMenu('history');
    };

    return (
        <div className="profile">
            <Modal
                show={show}
                onHide={handleClose}
                centered
                className="modal-add-user profile-modal"
                size={handleSize()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        onSelect={(e) => handleSelect(e)}
                    >
                        <Tab eventKey="profile" title="Profile">
                            <UserInfo handleClose={handleClose} />
                        </Tab>
                        <Tab eventKey="password" title="Change password">
                            <ChangePassword handleClose={handleClose} />
                        </Tab>
                        <Tab eventKey="history" title="Quiz history">
                            <QuizHistory handleClose={handleClose} />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalProfileUser;
