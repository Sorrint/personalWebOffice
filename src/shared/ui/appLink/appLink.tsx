import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './appLink.module.scss';
import classNames from 'classnames';

interface AppLinkProps {
    classname?: string
    to: string
    children: ReactNode
}
export const AppLink = ({classname, to, children}: AppLinkProps) => {
    const linkStyles = classNames(styles.component, classname)
    
    return <NavLink className={linkStyles} to={to}>
        {children}
    </NavLink>;
};