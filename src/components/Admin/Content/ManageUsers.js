import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss";

const ManageUsers = () => {
    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Title</h1>
            <div className="users-content">
                <button>Add new user</button>
                <div>table users</div>
                <ModalCreateUser />
            </div>
        </div>
    );
};

export default ManageUsers;
