import "./Auth.scss";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaGoogle, FaTwitter, FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { postLogin } from "../../services/apiServices";
import form__bg from "../../assets/img/form-login-bg.jpg";
import { doLogin } from "../../redux/action/userAction";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();

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
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Please enter a valid emal address!");
            return;
        }

        if (!password) {
            toast.error("Please enter your password!");
            return;
        }

        setLoading(true);
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(doLogin(res));

            navigate("/");
        } else {
            toast.error(res.EM);
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="form-media">
                <img src={form__bg} alt="" />
            </div>
            <div className="form-auth-wrapper">
                <div className="form-auth-inner">
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
                                    onChange={(e) =>
                                        setEmail(e.target.value.trimStart(" "))
                                    }
                                />
                                <MdOutlineEmail
                                    className="form-icon"
                                    color="#888"
                                />
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                            {loading ? (
                                <AiOutlineLoading className="form-icon-loading" />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                    <span className="form-signup-order">Or Sign In Using</span>
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
                    <span className="form-signup-order">
                        Have not account yet ?
                    </span>
                    <div className="d-flex justify-content-center">
                        <button
                            className="form-bottom"
                            onClick={() => navigate("/signup")}
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="form-back" onClick={() => navigate("/")}>
                        <FaArrowLeft className="form-back-icon" />
                        Back
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
