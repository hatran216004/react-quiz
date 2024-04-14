import "./Admin.scss";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

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
        </div>
    );
};

export default Admin;
