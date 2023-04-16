import { FC } from 'react';

import { IMenuItem } from '../api/menuItemsTypes';
import MenuItem from './menuItem';

interface MenuListProps {
    menuItems: Array<IMenuItem>;
}

const MenuList: FC<MenuListProps> = ({ menuItems, ...rest }) => {
    return (
        <>
            {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
            ))}
        </>
    );
};

export default MenuList;
