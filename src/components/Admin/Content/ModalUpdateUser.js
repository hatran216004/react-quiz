import "./ManageUsers.scss";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import _ from "lodash";

import { putUpdateUser } from "../../../services/apiServices";

const ModalUpdateUser = ({
    show,
    setShow,
    fetchListUsers,
    dataUpdate,
    setdataUpdate,
}) => {
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

    // Cleanup file image
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

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

    // Handle upload image
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
        setImage(e.target.files[0]);
    };

    const handleSubmitUpdateUser = async () => {
        // call api to update user
        let data = await putUpdateUser(dataUpdate.id, username, role, image);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsers();
        } else {
            toast.error(data.EM);
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
                            disabled
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
                    onClick={() => handleSubmitUpdateUser()}
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateUser;
