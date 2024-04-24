import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import hero_img from "../../assets/img/hero-img.png";
import decorate_img from "../../assets/img/decorate.svg";

const Home = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-left">
                    <div className="hero-left-top">
                        <button className="hero-left-top-btn">50% OFF</button>
                        <span>Learn From Today</span>
                    </div>
                    <h1 className="hero-left__heading">
                        Best <span>Learning</span> Platform For Everyone
                    </h1>
                    <div className="hero-left__desc">
                        Send your email marketing campaign quickly and easily.
                        Trusted by developers, designers and marketers for
                        time-savings, scalability and price.
                    </div>
                    {isAuthenticated ? (
                        <button
                            className="btn-custom btn-primary hero-btn"
                            onClick={() => navigate("/users")}
                        >
                            Let's go boiz
                        </button>
                    ) : (
                        <button
                            className="btn-custom btn-primary hero-btn"
                            onClick={() => navigate("/login")}
                        >
                            Get started—it's free
                        </button>
                    )}
                </div>
                <div className="hero-right">
                    <div className="hero-right-circle"></div>
                    <img src={hero_img} alt="" className="hero-right-img" />
                    <img
                        src={decorate_img}
                        alt=""
                        className="hero-right-decor"
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;
