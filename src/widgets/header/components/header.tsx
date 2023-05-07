import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header__burger">
                <span></span>
            </div>
            <div className="header__logo"></div>
            <span className="header__text">Кабинет</span>
            <div className="header__icon"></div>
            <Link className="header__mail" to={'/profile'}>
                sorrint@gmail.com
            </Link>
        </div>
    );
};

export default Header;
