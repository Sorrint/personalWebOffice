import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Icon } from '@shared/ui/icon';

import { type IMenuItem } from '../../model/menuItemsTypes';
import './menuLink.scss';

interface MenuLinkProps {
    item: IMenuItem
}

const MenuLink: FC<MenuLinkProps> = ({ item }) => {
    const getClassName = (isActive: boolean) => {
        return isActive ? 'navigation-menu__link active' : 'navigation-menu__link';
    };
    return (
        <NavLink className={({ isActive }) => getClassName(isActive)} to={item.path} key={item.id}>
            <li className='navigation-menu__item' id={item.id}>
                <Icon Icon={item.image} />
                <span className="navigation-menu__text">{item.text}</span>
            </li>
        </NavLink>
    );
};

export default MenuLink;
