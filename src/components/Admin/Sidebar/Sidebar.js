import { Link } from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import {
    FaUser,
    FaTachometerAlt,
    FaGem,
    FaList,
    FaHeart,
    FaReact,
} from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import "react-pro-sidebar/dist/css/styles.css";

import sidebarBg from "../../../assets/img/sidebar-bg.jpg";
import "./Sidebar.scss";

const Sidebar = ({ collapsed, toggled }) => {
    return (
        <ProSidebar
            className="sidebar"
            image={sidebarBg}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
        >
            {/* Header */}
            <SidebarHeader>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaReact className="sidebar-header-icon" />}
                    >
                        <div className="sidebar-header">React Quiz</div>
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            {/* Content */}
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaTachometerAlt />}>
                        Dashboard <Link to="/admin" />
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Components</MenuItem>
                    <SubMenu title={"Features"} icon={<GrUserManager />}>
                        <MenuItem>
                            Manage Users <Link to="/admin/manage-users" />
                        </MenuItem>
                        <MenuItem>Manage Quiz Test</MenuItem>
                        <MenuItem>Manage Questions</MenuItem>
                    </SubMenu>
                    <SubMenu title={"With Suffi"} icon={<FaHeart />}>
                        <MenuItem>Submenu 1</MenuItem>
                        <MenuItem>Submenu 2</MenuItem>
                        <MenuItem>Submenu 3</MenuItem>
                    </SubMenu>
                    <SubMenu title={"Multi Level"} icon={<FaList />}>
                        <MenuItem>Submenu 1 </MenuItem>
                        <MenuItem>Submenu 2 </MenuItem>
                        <SubMenu title={"Submenu 3"}>
                            <MenuItem>Submenu 3.1 </MenuItem>
                            <MenuItem>Submenu 3.2 </MenuItem>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter style={{ textAlign: "center" }}>
                <div className="sidebar-btn-wrapper">
                    <Link className="sidebar-btn" to="/">
                        <FaUser />
                        <span>Ha Tran</span>
                    </Link>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
