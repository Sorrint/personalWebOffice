import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './appLink.module.scss';
import classNames from 'classnames';

interface AppLinkProps {
  classname?: string;
  to: string;
  children: ReactNode;
  variant?: 'panel';
}
export const AppLink = ({ classname, to, children, variant }: AppLinkProps) => {
  const linkStyles = classNames(styles.component, { [styles.panel]: variant }, classname);

  return (
    <NavLink className={linkStyles} to={to}>
      {children}
    </NavLink>
  );
};
