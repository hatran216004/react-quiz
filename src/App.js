import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayout from './Layout/DefaultLayout';
import Home from './Pages/Home';
import Admin from './components/Admin';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUsers from './components/Admin/Content/ManageUsers';
import ManageQuiz from './components/Admin/Content/ManageQuiz';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import NotFound from './components/NotFound';
import Questions from './components/Admin/Content/Questions';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="users"
                        element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-quiz" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="*" element={<NotFound />} />
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
