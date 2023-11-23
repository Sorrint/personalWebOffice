import classNames from 'classnames';
import { memo, useContext, useMemo } from 'react';

import { Button } from '@shared/ui/button';

import { type IMenuItem, type IMenuItems } from '../../model/types/menuItemsTypes';
import { sideBarScope } from '../../model/slices/menuItems';
import { MenuItem } from '../menuItem/menuItem';
import styles from './sideBar.module.scss';
import { UserSettingsContext } from '@shared/lib/context/settingsContext';
import { IconFont } from '@shared/ui/iconFont';

export const SideBar = memo(() => {
    const {sidebar} = useContext(UserSettingsContext)
    const collapsed  = sidebar?.collapsed ?? false
    const hidden = sidebar?.hidden ?? false
    const changeSidebar = sidebar?.changeCollapsed
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
        <div className={classNames(styles.sidebar,{[styles.collapsed]: collapsed} )}>
            <nav className={classNames(styles.sidenav)}>
                {sideBarScope.map((item: IMenuItems) =>
                    <ul className={getSectionStyles(item.grow)} key={item.section}>
                        {menuItems(item.items)}
                    </ul>
                )}
            </nav>
            <Button onClick={changeSidebar} classname={styles.button}>
                {collapsed 
                    ? <IconFont iconName='icon-chevron-right'/>
                    : <IconFont iconName='icon-chevron-left'/>
                }
            </Button>
        </div>
    );
});
