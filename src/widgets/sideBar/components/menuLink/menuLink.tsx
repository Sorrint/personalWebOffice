import { NavLink } from 'react-router-dom';
import { IconFont } from '@shared/ui/iconFont';

import { type IMenuItem } from '../../model/menuItemsTypes';
import  styles from  './menuLink.module.scss';
import classNames from 'classnames';

interface MenuLinkProps {
    item: IMenuItem
}


const MenuLink = ({ item }: MenuLinkProps) => {
 
    const getClassName = (isActive: boolean) =>{
        return classNames(styles.link, {
            [styles.active]: isActive
        })
    } 
       
    return (
        <li className={styles.item} id={item.id}>
            <NavLink className={({ isActive }) => getClassName(isActive)} to={item.path} key={item.id}>
                {item.image && <IconFont iconName={item.image} classname={styles.icon}/>}
                <span className={styles.text}>{item.text}</span>
            </NavLink>
        </li>
    );
};

export default MenuLink;
