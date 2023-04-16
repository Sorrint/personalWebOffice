import MenuList from './menuList';
import { navBar } from '../api/menuItems';
import { IMenuItems } from '../api/menuItemsTypes';

const NavBar = () => {
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

export default NavBar;
