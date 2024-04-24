import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "./components/GlobalStyles";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles>
                <Router>
                    <App />
                </Router>
            </GlobalStyles>
        </PersistGate>
    </Provider>
);
reportWebVitals();
