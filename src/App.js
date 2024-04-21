import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultLayout from "./Layout/DefaultLayout";
import Home from "./Pages/Home";
import UserPage from "./Pages/User";
import Admin from "./components/Admin";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUsers from "./components/Admin/Content/ManageUsers";
import Login from "./components/Auth/Login";

const App = () => {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={<UserPage />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>

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

export default App;
