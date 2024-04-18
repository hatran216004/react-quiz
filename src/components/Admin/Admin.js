import "./Admin.scss";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <Sidebar collapsed={collapsed} />

            <div className="admin-content">
                <div className="admin-header">
                    <FaBars
                        className="admin-icon-toggle"
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </div>

                <div className="admin-main">
                    <Outlet />
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Admin;
