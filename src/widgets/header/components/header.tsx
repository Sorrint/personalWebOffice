import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header = () => {
    return (
        <div className="header">
            <div className="header__burger">
                <span></span>
            </div>
            <div className="header__logo"></div>
            <span className="header__text">Кабинет</span>
            <div className="header__icon"></div>
            <NavLink className="header__mail" to={'/office/profile'}>
                sorrint@gmail.com
            </NavLink>
        </div>
    );
};
