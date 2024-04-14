import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import GlobalSyles from "./components/GlobalSyles";
import User from "./components/User";
import Admin from "./components/Admin";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <GlobalSyles>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="/users" element={<User />} />
                    </Route>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </GlobalSyles>
    </Provider>
);
reportWebVitals();
