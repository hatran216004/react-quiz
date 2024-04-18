import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss";
import TableUser from "./TableUser";

const ManageUsers = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Users</h1>
            <div className="users-content">
                <button
                    className="btn-custom btn-add-user"
                    onClick={() => setShowModalCreateUser(true)}
                >
                    Add new user
                </button>
                <div className="table-user-wrapper">
                    <TableUser />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
