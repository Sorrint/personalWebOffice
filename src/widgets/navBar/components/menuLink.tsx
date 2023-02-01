import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { IMenuItem } from '../api/menuItemsTypes';

interface MenuLinkProps {
    item: IMenuItem;
}

const MenuLink: FC<MenuLinkProps> = ({ item }) => {
    let { pathname } = useLocation();

    let getClassName = () => {
        let name = item.id === pathname.split('/')[1] ? 'navigation-menu__item active' : 'navigation-menu__item';
        return name;
    };
    return (
        <Link to={item.path} key={item.id}>
            <li className={getClassName()} id={item.id}>
                <span className="navigation-menu__link">{item.text}</span>
                <div className="bar-chart"> {parse(item.image)}</div>
            </li>
        </Link>
    );
};

export default MenuLink;
