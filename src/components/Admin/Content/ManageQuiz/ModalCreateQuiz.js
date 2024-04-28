import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./ManageQuiz.scss";
import "../ManageUsers/ManageUsers.scss";
import { toast } from "react-toastify";
import Select from "react-select";

const ModalCreateQuiz = ({ show, setShow }) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState();

    // close modal
    const handleClose = () => {
        setShow(false);
    };

    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ];

    const handleUploadImage = (e) => {};

    const handleChange = (selectedOption) => {
        console.log(selectedOption);
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
                <Modal.Title>Add new quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="input-quiz-desc" className="form-label">
                            Description
                        </label>
                        <input
                            className="form-control"
                            id="input-quiz-desc"
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="input-quiz-name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="input-quiz-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label
                            htmlFor="input-quiz-difficult"
                            className="form-label"
                        >
                            Difficult
                        </label>
                        <Select
                            options={options}
                            value={type}
                            onChange={() => handleChange(type)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label
                            className="form-label modal-btn-upload"
                            htmlFor="upload"
                        >
                            <FaCloudUploadAlt className="modal-upload-icon" />
                            Upload image
                        </label>
                        <input
                            type="file"
                            hidden
                            id="upload"
                            value={image}
                            onChange={(e) => handleUploadImage(e)}
                        />
                    </div>
                    <div className="img-preview">
                        {image ? (
                            <img src={image.preview} alt="" />
                        ) : (
                            <span>Preview image</span>
                        )}
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
    );
};

export default ModalCreateQuiz;
