import classNames from 'classnames';
import { memo, useMemo } from 'react';

import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { IconFont } from '@shared/ui/iconFont';
import { Button } from '@shared/ui/button';

import { type IMenuItem, type IMenuItems } from '../../model/types/menuItemsTypes';
import { sidebarActions, sidebarReducer } from '../../model/slices/sidebarSlice';
import { isHiddenSidebar, isCollapsedSidebar } from '../../model/selectors/sidebarSelectors';
import { sideBarScope } from '../../model/slices/menuItems';
import { MenuItem } from '../menuItem/menuItem';
import styles from './sideBar.module.scss';

const reducers: ReducersList = {
    sidebar: sidebarReducer
}

export const SideBar = memo(() => {

    const collapsed = useAppSelector(isCollapsedSidebar) ?? false
    const visible = useAppSelector(isHiddenSidebar) ?? false
    const dispatch = useAppDispatch() 
    const changeCollapsed = () => dispatch(sidebarActions.changeCollapsed())

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
        <AsyncReduxComponent reducersList={reducers}>
            <div className={classNames(styles.sidebar,{[styles.collapsed]: collapsed, [styles.visible]: visible })} >
                <nav className={classNames(styles.sidenav)}>
                    {sideBarScope.map((item: IMenuItems) =>
                        <ul className={getSectionStyles(item.grow)} key={item.section}>
                            {menuItems(item.items)}
                        </ul>
                    )}
                </nav>
                <Button onClick={changeCollapsed} classname={styles.button}>
                    {collapsed 
                        ? <IconFont iconName='icon-chevron-right'/>
                        : <IconFont iconName='icon-chevron-left'/>
                    }
                </Button>
            </div>
        </AsyncReduxComponent>
    );
});
