import { type IMenuItem } from '../../model/menuItemsTypes';
import MenuLink from '../menuLink/menuLink';

interface MenuItemProps {
    item: IMenuItem
}

const MenuItem = ({ item }: MenuItemProps) => {
    return <MenuLink item={item} />
};

export default MenuItem;
