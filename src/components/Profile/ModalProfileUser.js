import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import QuizHistory from './QuizHistory';

const ModalProfileUser = ({ show, setShow }) => {
    const handleClose = () => {
        setShow(false);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="profile" title="Profile">
                            <UserInfo handleClose={handleClose} />
                        </Tab>
                        <Tab eventKey="password" title="Change password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            <QuizHistory />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalProfileUser;
