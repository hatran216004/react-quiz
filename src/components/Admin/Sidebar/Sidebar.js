import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import sidebar_bg from "../../../assets/img/sidebar-bg.jpg";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const SidebarComponent = ({ collapsed }) => {
    const handleStylesMenuItem = () => ({
        ".ps-menu-button": {
            "&:hover": {
                backgroundColor: "rgba(153, 153, 153, 0.4)",
            },
        },
    });

    return (
        <Sidebar
            collapsed={collapsed}
            width="300px"
            image={sidebar_bg}
            className="sidebar"
            backgroundColor="rgb(249, 249, 249, 0.1)"
        >
            <Menu rootStyles={handleStylesMenuItem}>
                <div className="sidebar-heading">React Quiz</div>
                <SubMenu
                    active
                    label={
                        <span className="sidebar-submenu">
                            <FontAwesomeIcon icon={faHouse} /> Charts
                        </span>
                    }
                >
                    <MenuItem>Pie charts</MenuItem>
                    <MenuItem>Line charts</MenuItem>
                </SubMenu>
                <MenuItem icon={<FontAwesomeIcon icon={faHouse} />}>
                    Documentation
                </MenuItem>
                <MenuItem>Calendar</MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default SidebarComponent;
