import "./ManageUsers.scss";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ModalViewUser = ({ show, setShow, dataUpdate, setdataUpdate }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [avatar, setAvatar] = useState(); // preview image
    const [image, setImage] = useState();

    useEffect(() => {
        // dataUpdate no empty
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);

            if (dataUpdate.image) {
                const newImage = {
                    preview: `data:image/jpeg;base64,${dataUpdate.image}`,
                };

                setAvatar(newImage);
            }
        }
    }, [dataUpdate]);

    // close modal
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setAvatar();
        setImage();
        setdataUpdate({});
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
                <Modal.Title>Update user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            disabled
                            value={email}
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
                            disabled
                            autoComplete="off"
                            value={password}
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
                            disabled
                            value={username}
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
                            disabled
                            value={role}
                            id="inputState"
                            className="form-select"
                        >
                            <option defaultValue value="USER">
                                USER
                            </option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
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
            </Modal.Footer>
        </Modal>
    );
};

export default ModalViewUser;
