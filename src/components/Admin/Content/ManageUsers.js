import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss";

const ManageUsers = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Users</h1>
            <div className="users-content">
                <button
                    className="btn-custom btn-add-user"
                    onClick={() => setShow(true)}
                >
                    Add new user
                </button>
                <div className="table-user-wrapper">table users</div>
                <ModalCreateUser show={show} setShow={setShow} />
            </div>
        </div>
    );
};

export default ManageUsers;
