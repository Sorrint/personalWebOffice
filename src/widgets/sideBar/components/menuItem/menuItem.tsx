import { type IMenuItem } from '../../model/menuItemsTypes';
import MenuLink from '../menuLink/menuLink';

interface MenuItemProps {
    item: IMenuItem
}

const MenuItem = ({ item }: MenuItemProps) => {
    return item.wrapperClassName
        ? (
            <div className={item.wrapperClassName}>
                <MenuLink item={item} />
            </div>
        )
        : (
            <MenuLink item={item} />
        );
};

export default MenuItem;
