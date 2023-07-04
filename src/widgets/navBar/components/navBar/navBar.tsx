import MenuList from '../menuList/menuList';
import { navBar } from '../../model/menuItems';
import { IMenuItems } from '../../model/menuItemsTypes';

import './navBar.scss'
export const NavBar = () => {
    return (
        <div className="app__sidenav">
            <nav className="navigation">
                <ul className="navigation-menu">
                    {navBar.map((navItem: IMenuItems) =>
                        navItem.wrapperClassName ? (
                            <section className={navItem.wrapperClassName} key={navItem.id}>
                                <MenuList menuItems={navItem.items} />
                            </section>
                        ) : (
                            <MenuList menuItems={navItem.items} key={navItem.id} />
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
};

