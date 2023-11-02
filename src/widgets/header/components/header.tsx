import { NavLink } from 'react-router-dom';
import { memo, useState } from 'react';

import { Button } from '@shared/ui/button';
import { RegistrationForm } from '@features/registrationForm';
import { PopupWithFocusTrap } from '@shared/ui/popup';

import styles from './header.module.scss';

export const Header = memo(() => {
    const [isOpen, setIsOpen] = useState(false)
    const closePopup = ()=>{
        setIsOpen(false)
    }

    return (    
        <div className={styles.header}>
            <div className={styles.burger}>
                <span></span>
            </div>
            <div className={styles.logo}></div>
            <span className={styles.text}>Кабинет</span>
            <Button classname={styles.auth} onClick={()=> setIsOpen(true)}>Войти</Button>
            <div className={styles.icon}></div>
            <NavLink className={styles.mail} to={'/office/profile'}>
                sorrint@gmail.com
            </NavLink>
            <PopupWithFocusTrap isOpened={isOpen} onClose={closePopup}>
                <RegistrationForm/>
            </PopupWithFocusTrap>
        </div>
    );
});
