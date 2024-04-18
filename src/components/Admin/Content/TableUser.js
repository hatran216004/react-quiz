import React, { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";

const TableUser = ({}) => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    // 2:46:36

    return (
        <>
            {listUsers.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Id</th>
                            <th scope="col">User name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <th className="text-center">{user.id}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">{user.role}</td>
                                    <td className="d-flex justify-content-center">
                                        <button className="btn-custom btn-add-user">
                                            View
                                        </button>
                                        <button className="btn-custom btn-update">
                                            Update
                                        </button>
                                        <button className="btn-custom btn-delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <span className="no-data">Not found data</span>
            )}
        </>
    );
};

export default TableUser;
