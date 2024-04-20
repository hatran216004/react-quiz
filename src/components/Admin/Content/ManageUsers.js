import { useState, useEffect } from "react";
import "./ManageUsers.scss";
import TableUser from "./TableUser";
import { getAllUser } from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUsers = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setdataUpdate] = useState({});
    const [dataDelete, setdataDelete] = useState({});

    useEffect(() => {
        fetchListUsers();
    }, []);

    // call api to get all user
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

    const handleShowDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setdataDelete(user);
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
                        handleShowDeleteUser={handleShowDeleteUser}
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
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
