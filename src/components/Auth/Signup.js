import "./Auth.scss";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaGoogle, FaTwitter, FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignup } from "../../services/apiServices";
import form__signup_bg from "../../assets/img/form-signup-bg.jpg";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignup = async (e) => {
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
        let res = await postSignup(email, username, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/login");
        } else {
            toast.error(res.EM);
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="form-media">
                <img src={form__signup_bg} alt="" />
            </div>
            <div className="form-auth-wrapper form-auth-wrapper-signup">
                <div className="form-auth-inner">
                    <h2 className="form-title">Sign Up</h2>
                    <form action="" autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <div className="form-text-input">
                                <input
                                    required
                                    id="email"
                                    type="email"
                                    className="form-input"
                                    placeholder="Type your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineEmail
                                    className="form-icon"
                                    color="#888"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <div className="form-text-input">
                                <input
                                    id="username"
                                    type="text"
                                    className="form-input"
                                    placeholder="Type your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                                    required
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
                        <button
                            className="form-submit"
                            onClick={(e) => handleSignup(e)}
                        >
                            {loading ? (
                                <AiOutlineLoading className="form-icon-loading" />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>
                    <span className="form-signup-order">Or Sign Up Using</span>
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
                        Do you have an account?
                    </span>
                    <div className="d-flex justify-content-center">
                        <button
                            className="form-bottom"
                            onClick={() => navigate("/login")}
                        >
                            SIGN IN
                        </button>
                    </div>
                    <div className="form-back" onClick={() => navigate("/")}>
                        <FaArrowLeft className="form-back-icon" />
                        Back Home
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
