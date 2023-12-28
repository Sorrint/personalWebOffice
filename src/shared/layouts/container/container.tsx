import { type ReactNode, memo } from 'react';
import classNames from 'classnames';

import style from './container.module.scss';

interface ContainerProps {
    classname?: string
    children: ReactNode
}

export const Container = memo(({classname, children}: ContainerProps) => {
    return <div className={classNames(style.component, classname)}>{children}</div>;
});