import "./Auth.scss";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaFacebookF, FaGoogle, FaTwitter, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiServices";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // validate

        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/");
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <div className="login-container">
                <h2 className="form-title">Login</h2>
                <form action="" autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email (testlogin@gmail.com)
                        </label>
                        <div className="form-text-input">
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="Type your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <CiUser className="form-icon" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password (123456)
                        </label>
                        <div className="form-text-input">
                            <input
                                autoComplete="off"
                                id="password"
                                placeholder="Type your password"
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <span className="form-forgotpassword">
                        Forgot password?
                    </span>
                    <button
                        className="form-submit"
                        onClick={(e) => handleLogin(e)}
                    >
                        Login
                    </button>
                    <span>Or Sign Up Using</span>
                    <div className="form-socials">
                        <div className="form-socials-item">
                            <FaFacebookF color="#fff" />
                        </div>
                        <div className="form-socials-item">
                            <FaTwitter color="#fff" />
                        </div>
                        <div className="form-socials-item">
                            <FaGoogle color="#fff" />
                        </div>
                    </div>
                    <span>Have not account yet ?</span>
                    <div className="form-bottom">
                        <a href="#!">SIGN UP</a>
                    </div>
                    <div className="form-back" onClick={() => navigate("/")}>
                        <FaArrowLeft className="form-back-icon" />
                        Back
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
