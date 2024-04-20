import { useState, useEffect } from "react";
import "./ManageUsers.scss";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";

const ManageUsers = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setdataUpdate] = useState({});

    useEffect(() => {
        fetchListUsers();
    }, []);

    // all api to get all user
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

    const handleShowViewUser = (user) => {
        setShowModalViewUser(true);
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
                        handleShowViewUser={handleShowViewUser}
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
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    setdataUpdate={setdataUpdate}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
