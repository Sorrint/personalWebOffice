import { NavLink } from 'react-router-dom';
import { memo, useContext, useRef, useState } from 'react';

import { IconFont } from '@shared/ui/iconFont';
import { AuthContext } from '@shared/lib/context/authContext';
import { useLogout } from '@features/logout';
import { Popover } from '@shared/ui/popover';

import styles from './header.module.scss';

export const Header = memo(() => {

    const {name} = useContext(AuthContext)
    const {logout} = useLogout()
    const refEl = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const setPopover = () => {
        setIsOpen(!isOpen)
    }

    return (    
        <div className={styles.header}>
            <div className={styles.burger}>
                <span></span>
            </div>
            <div className={styles['logo-group']}>
                <IconFont iconName='icon-feather' classname={styles.logo}/>
                <span className={styles['logo-text']}>Кабинет</span>
            </div>
            <div className={styles['profile-group']}>
                <IconFont iconName='icon-profile' classname={styles.icon}/>
                <div ref={refEl} onClick={setPopover} className={styles.mail}>
                    {name}
                </div>
            </div>

            {refEl && refEl.current && isOpen &&
            <Popover isOpen={isOpen} onClose={()=> setIsOpen(false)} referenceElement={refEl.current as HTMLElement} key={'profile'}> 
                <div className={styles.menu} onClick={()=> setIsOpen(false)}>
                    <div className={styles['menu-item']} >
                        <NavLink  to={'/office/profile'}>
                            Профиль
                        </NavLink>
                    </div>
                    <div onClick={logout} className={styles['menu-item']}>Выйти</div>
                </div>
            </Popover>
            }
        </div>
    );
});
