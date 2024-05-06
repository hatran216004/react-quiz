import { Link, useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaUser, FaTachometerAlt, FaGem, FaReact, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';
import { GrUserManager } from 'react-icons/gr';
import 'react-pro-sidebar/dist/css/styles.css';

import sidebarBg from '../../../assets/img/sidebar-bg.jpg';
import './Sidebar.scss';
import { useState } from 'react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <ProSidebar className="sidebar" image={sidebarBg} collapsed={collapsed} toggled breakPoint="md">
            <SidebarHeader>
                <Menu iconShape="circle">
                    {collapsed ? (
                        <MenuItem icon={<FaAngleDoubleRight />} onClick={() => setCollapsed(!collapsed)}></MenuItem>
                    ) : (
                        <MenuItem suffix={<FaAngleDoubleLeft />} onClick={() => setCollapsed(!collapsed)}>
                            <div className="sidebar-header">
                                <FaReact className="sidebar-header-icon" />
                                <h3 className="sidebar-title">React Quiz</h3>
                            </div>
                        </MenuItem>
                    )}
                </Menu>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaTachometerAlt />}>
                        Dashboard <Link to="/admin" />
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>Components</MenuItem>
                    <SubMenu title={'Features'} icon={<GrUserManager />}>
                        <MenuItem>
                            Manage Users <Link to="/admin/manage-users" />
                        </MenuItem>
                        <MenuItem>
                            Manage Quiz Test <Link to="/admin/manage-quiz" />
                        </MenuItem>
                        <MenuItem>
                            Manage Questions
                            <Link to="/admin/manage-questions" />
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }} onClick={() => navigate('/')}>
                <div className="sidebar-footer">
                    <FaUser />
                    <span>Home</span>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
