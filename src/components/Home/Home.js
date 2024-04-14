import hero_video from "../../assets/video/hero.mp4";
import "./Home.scss";

const Home = () => {
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
                    <button className="btn-custom btn-primary hero-btn">
                        Get started—it's free
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;
