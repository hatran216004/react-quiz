import { useState, useEffect } from "react";
import "./ManageUsers.scss";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUsers = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setdataUpdate] = useState({});

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

    const handleShowUpdateUser = (user) => {
        setShowModalUpdateUser(true);
        setdataUpdate(user);
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
                    <TableUser
                        listUsers={listUsers}
                        handleShowUpdateUser={handleShowUpdateUser}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    setdataUpdate={setdataUpdate}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
