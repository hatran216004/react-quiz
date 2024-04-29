import "./ManageQuiz.scss";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import Modal from "react-bootstrap/Modal";
import "../ManageUsers/ManageUsers.scss";
import { deleteQuiz } from "../../../../services/apiServices";

const ModalDeleteQuiz = ({ show, setShow, dataDelete, fetchListQuiz }) => {
    const handleClose = () => {
        setShow(false);
    };

    const handleComfirmDeleteQuiz = async () => {
        let res = await deleteQuiz(dataDelete.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            fetchListQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            className="modal-add-user"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete quiz{" "}
                <b>{dataDelete && dataDelete.name}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleComfirmDeleteQuiz}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteQuiz;
