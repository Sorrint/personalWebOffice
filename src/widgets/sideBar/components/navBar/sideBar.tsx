import MenuList from '../menuList/menuList';
import { navBar } from '../../model/menuItems';
import { type IMenuItems } from '../../model/menuItemsTypes';

import styles from './sideBar.module.scss';

export const SideBar = () => {
    return (
        <div className={styles.sidenav}>
            <nav className={styles.navigation}>
                <ul className={styles.navigation__menu}>
                    {navBar.map((navItem: IMenuItems) =>
                        navItem.wrapperClassName
                            ? (
                                <section className={navItem.wrapperClassName} key={navItem.id}>
                                    <MenuList menuItems={navItem.items} />
                                </section>
                            )
                            : (
                                <MenuList menuItems={navItem.items} key={navItem.id} />
                            )
                    )}
                </ul>
            </nav>
        </div>
    );
};
