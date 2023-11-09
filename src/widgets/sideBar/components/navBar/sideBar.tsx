import MenuList from '../menuList/menuList';
import { sideBarScope } from '../../model/menuItems';
import { type IMenuItems } from '../../model/menuItemsTypes';

import styles from './sideBar.module.scss';
import classNames from 'classnames';


export const SideBar = () => {
    const getSectionStyles =(grow: boolean | undefined) => classNames(styles.section, {
        [styles.grow]: grow
    })

    return (
        <nav className={styles.sidenav}>
            <ul className={styles.menu}>
                {sideBarScope.map((navItem: IMenuItems) =>
                    <section className={getSectionStyles(navItem.grow)} key={navItem.section}>
                        <MenuList menuItems={navItem.items} />
                    </section>
                )}
            </ul>
        </nav>
    );
};
