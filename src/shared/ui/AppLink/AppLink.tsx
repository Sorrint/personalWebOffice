import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AppLink.module.scss';
import classNames from 'classnames';

interface AppLinkProps {
  className?: string;
  to: string;
  children?: ReactNode;
  variant?: 'panel';
}
export const AppLink = ({ className, to, children, variant }: AppLinkProps) => {
  const linkStyles = classNames(styles.component, { [styles.panel]: variant }, className);

  return (
    <NavLink className={linkStyles} to={to}>
      {children}
    </NavLink>
  );
};
