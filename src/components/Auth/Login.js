import { useState } from "react";
import "./Auth.scss";
import { CiUser } from "react-icons/ci";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log(123);
    };

    return (
        <div className="login-container">
            <h2 className="form-title">Login</h2>
            <form action="" autoComplete="off">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
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
                        Password
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
                <a href="#!" className="form-forgotpassword">
                    Forgot password?
                </a>
                <button className="form-submit" onClick={handleLogin}>
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
            </form>
        </div>
    );
};

export default Login;
