import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const ModalCreateUser = ({ show, setShow }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [avatar, setAvatar] = useState();
    // const [image, setImage] = useState("");

    // close modal
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setAvatar();
    };

    // Cleanup file image
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // Handle upload image
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const handleSubmitCreateUser = async () => {
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("username", username);
        data.append("role", role);
        data.append("userImage", avatar);

        let res = await axios.post(
            "http://localhost:8081/api/v1/participant",
            data
        );
        console.log(res);
        handleClose();
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
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control"
                            id="inputCity"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">
                            Role
                        </label>
                        <select
                            value={role}
                            id="inputState"
                            className="form-select"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option defaultValue value="USER">
                                USER
                            </option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
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
                        {avatar ? (
                            <img src={avatar.preview} alt="" />
                        ) : (
                            <span>Preview avatar</span>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleSubmitCreateUser()}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateUser;
