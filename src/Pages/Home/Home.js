import { useNavigate } from "react-router-dom";
import hero_video from "../../assets/video/hero.webm";
import "./Home.scss";
import { useSelector } from "react-redux";

const Home = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-left">
                    <video
                        src={hero_video}
                        autoPlay
                        muted
                        loop
                        className="hero-media"
                    ></video>
                </div>
                <div className="hero-right">
                    <h1 className="hero-right__heading">
                        Make forms worth filling out
                    </h1>
                    <div className="hero-right__desc">
                        Get more data — like signups, feedback, and anything
                        else —with forms designed to be
                        <strong>refreshingly different.</strong>
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
            </div>
        </section>
    );
};

export default Home;
