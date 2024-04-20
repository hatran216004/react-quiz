import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = ({ show, setShow, dataDelete, fetchListUsers }) => {
    const handleClose = () => setShow(false);

    const handleComfirmDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsers();
        } else {
            toast.error(data.EM);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete this user with email:{" "}
                <b>{dataDelete && dataDelete.email}</b>?
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
