import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './buttonLink.module.scss';
import classNames from 'classnames';

interface ButtonLinkProps {
    classname?: string
    to: string
    children: ReactNode
}
export const ButtonLink = ({classname, to, children}: ButtonLinkProps) => {
    return <Link className={classNames(styles.link, classname)} to={to}>
        {children}
    </Link>;
};