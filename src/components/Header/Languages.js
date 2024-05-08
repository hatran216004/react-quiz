import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Languages = ({ noMargin }) => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <NavDropdown
            title={i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
            id="basic-nav-dropdown-2"
            className={noMargin ? 'switch-languages switch-languages-no-margin' : 'switch-languages'}
        >
            <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</NavDropdown.Item>
        </NavDropdown>
    );
};

export default Languages;
