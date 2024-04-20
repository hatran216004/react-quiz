import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeleteUser = ({ show, setShow, dataDelete }) => {
    const handleClose = () => setShow(false);

    const handleComfirmDeleteUser = () => {
        console.log("test delete suer");
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete this user with email:{" "}
                <b>{dataDelete.email}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleComfirmDeleteUser}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteUser;
