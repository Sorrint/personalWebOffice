import { type ReactNode, memo } from 'react';
import classNames from 'classnames';

import style from './Container.module.scss';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container = memo(({ className, children }: ContainerProps) => (
  <div className={classNames(style.component, className)}>{children}</div>
));

Container.displayName = 'Container';
