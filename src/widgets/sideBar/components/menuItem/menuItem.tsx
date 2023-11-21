import { NavLink } from 'react-router-dom';
import { IconFont } from '@shared/ui/iconFont';

import { type IMenuItem } from '../../model/types/menuItemsTypes';
import  styles from  './menuItem.module.scss';
import classNames from 'classnames';

interface MenuLinkProps {
    item: IMenuItem,
    collapsed: boolean
}

export const MenuItem = ({ item, collapsed }: MenuLinkProps) => {
 
    const getClassName = (isActive: boolean) =>{
        return classNames(styles.link, {
            [styles.active]: isActive,
            [styles.collapsed]: collapsed
        })
    } 
       
    return (
        <li className={classNames(styles.item, {[styles.collapsed]: collapsed})} id={item.id}>
            <NavLink className={({ isActive }) => getClassName(isActive)} to={item.path} key={item.id}>
                {item.image && <IconFont iconName={item.image} classname={styles.icon}/>}
                <span className={styles.text}>{item.text}</span>
                {collapsed && <div className={styles.tooltip}>{item.text}</div>}
            </NavLink>
        </li>
    );
};

