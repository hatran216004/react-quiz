import { useState, useEffect } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";

const ManageUsers = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchListUsers();
    }, []);

    // all api get all user
    const fetchListUsers = async () => {
        let data = await getAllUser();
        if (data.EC === 0) {
            setListUsers(data.DT);
        }
    };

    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Users</h1>
            <div className="users-content">
                <div className="d-flex">
                    <button
                        className="btn-custom btn-add-user ms-auto"
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        Add new user
                    </button>
                </div>
                <div className="table-user-wrapper">
                    <TableUser listUsers={listUsers} />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
