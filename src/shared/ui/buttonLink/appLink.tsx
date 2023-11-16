import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './appLink.module.scss';
import classNames from 'classnames';

interface AppLinkProps {
    classname?: string
    to: string
    children: ReactNode
    buttonStyle?: boolean
}
export const AppLink = ({classname, to, children, buttonStyle}: AppLinkProps) => {
    const linkStyles = classNames(
        {
            [styles.link]: buttonStyle
        }, classname
    )
    return <Link className={linkStyles} to={to}>
        {children}
    </Link>;
};