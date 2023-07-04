import { FC } from 'react';
import { IMenuItem } from '../../model/menuItemsTypes';

import MenuItem from '../menuItem/menuItem';

interface MenuListProps {
    menuItems: IMenuItem[];
}

const MenuList: FC<MenuListProps> = ({ menuItems }) => {
    return (
        <>
            {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
            ))}
        </>
    );
};

export default MenuList;
