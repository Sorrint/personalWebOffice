import { type ReactNode, memo, useContext, useRef, useState } from 'react';

import { IconFont } from '@shared/ui/IconFont';
import { AuthContext } from '@shared/lib/context/AuthContext';
import { useLogout } from '@features/Logout';
import { Popover } from '@shared/ui/Popover';

import styles from './Header.module.scss';
import { AppLink } from '@shared/ui/AppLink';

interface HeaderProps {
  sidebarButton?: ReactNode;
}

export const Header = memo(({ sidebarButton }: HeaderProps) => {
  const { name } = useContext(AuthContext);
  const { logout } = useLogout();
  const refEl = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setPopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles['logo-group']}>
        {sidebarButton}
        <IconFont iconName='icon-feather' className={styles.logo} />
        <span className={styles['logo-text']}>Кабинет</span>
      </div>
      <div className={styles['profile-group']}>
        <IconFont iconName='icon-profile' className={styles.icon} />
        <div ref={refEl} onClick={setPopover} className={styles.mail}>
          {name}
        </div>
      </div>

      {refEl && refEl.current && isOpen && (
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          referenceElement={refEl.current as HTMLElement}
          key={'profile'}
        >
          <div className={styles.menu} onClick={() => setIsOpen(false)}>
            <AppLink to={'/office/profile'} className={styles['menu-item']}>
              Профиль
            </AppLink>
            <div onClick={logout} className={styles['menu-item']}>
              Выйти
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
});

Header.displayName = 'Header';
