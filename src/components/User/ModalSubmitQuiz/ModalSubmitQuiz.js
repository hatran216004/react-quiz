import "./ModalSubmitQuiz.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalSubmitQuiz = ({ show, setShow, dataResult }) => {
    const handleClose = () => setShow(false);
    console.log(dataResult);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Your Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-submit-message">
                    <p>Correct answers:</p>
                    <span>{dataResult.countCorrect}</span>
                </div>
                <div className="modal-submit-message">
                    <p>Total answers:</p>
                    <span>{dataResult.countTotal}</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleClose}>
                    Comfirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSubmitQuiz;
