import { useState } from "react";
import "./Admin.scss";
import SidebarComponent from "./Sidebar";
import { FaBars } from "react-icons/fa";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <SidebarComponent collapsed={collapsed} />
            <div className="admin-content">
                <FaBars onClick={() => setCollapsed(!collapsed)} />
                content
            </div>
        </div>
    );
};

export default Admin;
