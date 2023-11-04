import { NavLink } from 'react-router-dom';
import { memo } from 'react';

import styles from './header.module.scss';

export const Header = memo(() => {


    return (    
        <div className={styles.header}>
            <div className={styles.burger}>
                <span></span>
            </div>
            <div className={styles.logo}></div>
            <span className={styles.text}>Кабинет</span>
            <div className={styles.icon}></div>
            <NavLink className={styles.mail} to={'/office/profile'}>
                sorrint@gmail.com
            </NavLink>
 
        </div>
    );
});
