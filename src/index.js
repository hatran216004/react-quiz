import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import User from "./components/User";
import Admin from "./components/Admin";
import Home from "./components/Home";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUsers from "./components/Admin/Content/ManageUsers";
import Login from "./components/Auth/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <GlobalStyles>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="users" element={<User />} />
                    </Route>
                    <Route path="/admin" element={<Admin />}>
                        <Route index element={<DashBoard />} />
                        <Route path="manage-users" element={<ManageUsers />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </GlobalStyles>
    </Provider>
);
reportWebVitals();
