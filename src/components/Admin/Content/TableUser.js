import { useState } from "react";
import ReactPaginate from "react-paginate";

const TableUser = ({
    listUsers,
    pageCount,
    handleShowUpdateUser,
    handleShowViewUser,
    handleShowDeleteUser,
    fetchListUsersWithPaginate,
}) => {
    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1);
    };

    return (
        <>
            {listUsers.length > 0 ? (
                <>
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
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center">
                                            {user.role}
                                        </td>
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
                                            <button
                                                className="btn-custom btn-delete"
                                                onClick={() =>
                                                    handleShowDeleteUser(user)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </>
            ) : (
                <span className="no-data">Not found data</span>
            )}
        </>
    );
};

export default TableUser;
