import "./Admin.scss";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import image_admin from "../../assets/img/quiz-img-1.jpg";

const Admin = () => {
    return (
        <div className="admin-container">
            <Sidebar />

            <div className="admin-content container">
                {/* <div className="admin-header">
                    <img src={image_admin} alt="" />
                </div> */}
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
