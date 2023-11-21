import classNames from 'classnames';
import { useMemo, useState } from 'react';

import { Button } from '@shared/ui/button';

import { type IMenuItem, type IMenuItems } from '../../model/types/menuItemsTypes';
import { sideBarScope } from '../../model/slices/menuItems';
import { MenuItem } from '../menuItem/menuItem';
import styles from './sideBar.module.scss';

export const SideBar = () => {
    const {0: collapsed, 1: setCollapsed} = useState<boolean>(false)
  
    const changeSidebar = () => {
        setCollapsed(prev => !prev)
    }

    const menuItems = useMemo(() => (items: IMenuItem[]) => 
        items.map((item) => (
            <MenuItem 
                key={item.text} 
                item={item} 
                collapsed = {collapsed}/>
        )), [collapsed])

    const getSectionStyles =(grow: boolean | undefined) => classNames(styles.section, {
        [styles.grow]: grow,
    })

    return (
        <nav className={classNames(styles.sidenav, {[styles.collapsed]: collapsed})}>
            {sideBarScope.map((item: IMenuItems) =>
                <ul className={getSectionStyles(item.grow)} key={item.section}>
                    {menuItems(item.items)}
                </ul>
            )}
            <Button onClick={changeSidebar}>Нажми меня</Button>
        </nav>
    );
};
