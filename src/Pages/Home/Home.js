import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import hero_img from '../../assets/img/hero-img.png';
import decorate_img from '../../assets/img/decorate.svg';
import { useTranslation, Trans } from 'react-i18next';

const Home = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="hero-left">
                            <div className="hero-left-top">
                                <button className="hero-left-top-btn">{t('homepage.topBtn')}</button>
                                <span>{t('homepage.heroLeftTop')}</span>
                            </div>
                            <h1 className="hero-left__heading">
                                {t('homepage.heroLeftHeading.Heading1')}{' '}
                                <span>{t('homepage.heroLeftHeading.Heading2')}</span>{' '}
                                {t('homepage.heroLeftHeading.Heading3')}
                            </h1>
                            <div className="hero-left__desc">{t('homepage.heroDesc')}</div>
                            {isAuthenticated ? (
                                <button className="btn-custom btn-primary hero-btn" onClick={() => navigate('/users')}>
                                    {t('homepage.heroAction')}
                                </button>
                            ) : (
                                <button className="btn-custom btn-primary hero-btn" onClick={() => navigate('/login')}>
                                    {t('homepage.heroBottom')}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="hero-right">
                            <div className="hero-right-circle"></div>
                            <img src={hero_img} alt="" className="hero-right-img" />
                            <img src={decorate_img} alt="" className="hero-right-decor" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
