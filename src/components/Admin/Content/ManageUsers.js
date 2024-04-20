import { useState, useEffect } from "react";
import "./ManageUsers.scss";
import TableUser from "./TableUser";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUsers = () => {
    const LIMIT_USER = 8;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setdataUpdate] = useState({});
    const [dataDelete, setdataDelete] = useState({});

    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    // call api to get all user
    const fetchListUsers = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    // call api to get user with paginate
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
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
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
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
