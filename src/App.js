import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <Container className="main-container">
                <div className="sidenav-container"></div>
                <div className="app-content">
                    <Outlet />
                </div>
            </Container>
        </div>
    );
};

export default App;
