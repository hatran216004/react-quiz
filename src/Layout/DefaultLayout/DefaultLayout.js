import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Container className="main-container">
                <div className="app-content">
                    <Outlet />
                </div>
            </Container>
        </>
    );
};

export default DefaultLayout;
