import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';

import { IMenuItem } from '../../model/menuItemsTypes';
import './menuLink.scss'

interface MenuLinkProps {
    item: IMenuItem;
}

const MenuLink: FC<MenuLinkProps> = ({ item }) => {

    let getClassName = (isActive: boolean) => {
        return isActive ? 'navigation-menu__link active' : 'navigation-menu__link'
    };
    return (
        <NavLink className={({isActive})=> getClassName(isActive)} to={item.path} key={item.id}>
            <li className='navigation-menu__item' id={item.id}>
                <span className="navigation-menu__text">{item.text}</span>
                <div className="bar-chart"> {parse(item.image)}</div>
            </li>
        </NavLink>
    );
};

export default MenuLink;
