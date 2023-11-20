import classNames from 'classnames';

import { type IMenuItem, type IMenuItems } from '../../model/menuItemsTypes';
import { sideBarScope } from '../../model/menuItems';
import { MenuItem } from '../menuItem/menuItem';
import styles from './sideBar.module.scss';
import { useMemo, useState } from 'react';


export const SideBar = () => {
    const [collapsed] = useState(true)

    const getSectionStyles =(grow: boolean | undefined) => classNames(styles.section, {
        [styles.grow]: grow,
    })



    const menuItems = useMemo(() => (items: IMenuItem[]) => 
        items.map((item) => (
            <MenuItem 
                key={item.text} 
                item={item} 
                collapsed = {collapsed}/>
        )), [collapsed])

    return (
        <nav className={classNames(styles.sidenav, {[styles.collapsed]: collapsed})}>
            {sideBarScope.map((item: IMenuItems) =>
                <ul className={getSectionStyles(item.grow)} key={item.section}>
                    {menuItems(item.items)}
                </ul>
            )}
        </nav>
    );
};
