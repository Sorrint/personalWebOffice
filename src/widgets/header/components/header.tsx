import { NavLink } from 'react-router-dom';
import { memo, useContext } from 'react';

import { IconFont } from '@shared/ui/iconFont';
import { AuthContext } from '@shared/lib/context/authContext';
import { Button } from '@shared/ui/button';
import { useLogout } from '@features/logout';

import styles from './header.module.scss';

export const Header = memo(() => {
    const {name} = useContext(AuthContext)

    const {logout} = useLogout()
    
    return (    
        <div className={styles.header}>
            <div className={styles.burger}>
                <span></span>
            </div>
            <div className={styles.logo}></div>
            <span className={styles.text}>Кабинет</span>
            <Button onClick={logout}> Выйти</Button>
            {/* <div className={styles.icon}></div> */}
            <IconFont iconName='icon-profile' classname={styles.icon}/>
            <NavLink className={styles.mail} to={'/office/profile'}>
                {name}
            </NavLink>
 
        </div>
    );
});
