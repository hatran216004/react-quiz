const TableUser = ({ listUsers, handleShowUpdateUser, handleShowViewUser }) => {
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
                        {listUsers.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">{user.role}</td>
                                    <td className="d-flex justify-content-center">
                                        <button
                                            className="btn-custom btn-view-user"
                                            onClick={() =>
                                                handleShowViewUser(user)
                                            }
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn-custom btn-update"
                                            onClick={() =>
                                                handleShowUpdateUser(user)
                                            }
                                        >
                                            Edit user
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
