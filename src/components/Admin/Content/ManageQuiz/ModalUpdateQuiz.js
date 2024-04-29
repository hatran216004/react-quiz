import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./ManageQuiz.scss";
import "../ManageUsers/ManageUsers.scss";
import { toast } from "react-toastify";
import Select from "react-select";
import { putUpdateQuiz } from "../../../../services/apiServices";
import _ from "lodash";

const ModalUpdateQuiz = ({
    show,
    setShow,
    dataUpdate,
    setDataUpdate,
    fetchListQuiz,
}) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState();

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDesc(dataUpdate.description);
            setType(dataUpdate.difficulty);

            const newImage = {
                preview: `data:image/jpeg;base64,${dataUpdate.image}`,
            };
            setImage(newImage);
        }
    }, [dataUpdate]);

    // close modal
    const handleClose = () => {
        setShow(false);
        setName("");
        setDesc("");
        setType();
        setImage();
        setDataUpdate({});
    };

    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ];

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };

    const handleUpdateQuiz = async () => {
        if (typeof type === "string") {
            toast.error("Please select difficult of quiz!");
            return;
        }

        let res = await putUpdateQuiz(
            dataUpdate.id,
            name,
            desc,
            type.value,
            image
        );

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
                <Modal.Title>Update quiz</Modal.Title>
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
                            defaultValue={type}
                            onChange={setType}
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
                <Button variant="primary" onClick={handleUpdateQuiz}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateQuiz;
