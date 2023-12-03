import { type ReactNode, memo } from 'react';
import styles from './errorField.module.scss';
import classNames from 'classnames';

interface ErrorFieldProps {
    classname?: string
    children: string | ReactNode
}
export const ErrorField = memo(({children, classname}: ErrorFieldProps) => {
    if (!children) return null

    const errorStyle = classNames(styles.error, classname)
    return <small className={errorStyle}>{children}</small>;
});