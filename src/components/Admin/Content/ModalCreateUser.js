import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalCreateUser = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                            />
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="inputPassword4"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                            />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputCity" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                            />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputState" className="form-label">
                                Role
                            </label>
                            <select id="inputState" className="form-select">
                                <option defaultValue value="USER">
                                    USER
                                </option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Avatar</label>
                            <input type="file" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateUser;
