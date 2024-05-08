import './Admin.scss';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Admin = () => {
    return (
        <div className="admin-container">
            <Sidebar />

            <div className="admin-content container">
                <PerfectScrollbar>
                    <div className="admin-main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Admin;
