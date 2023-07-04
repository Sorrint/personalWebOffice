import { FC } from 'react';

import { IMenuItem } from '../../model/menuItemsTypes';

import './menuItem.scss'
import MenuLink from '../MenuLink/menuLink';

interface MenuItemProps {
    item: IMenuItem;
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
    return item.wrapperClassName ? (
        <div className={item.wrapperClassName}>
            <MenuLink item={item} />
        </div>
    ) : (
        <MenuLink item={item} />
    );
};

export default MenuItem;
