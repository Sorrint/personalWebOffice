import { type ReactNode, memo } from 'react';
import classNames from 'classnames';

import style from './container.module.scss';

interface ContainerProps {
  classname?: string;
  scrollable?: boolean;
  children: ReactNode;
}

export const Container = memo(({ classname, children, scrollable }: ContainerProps) => {
  return (
    <>
      {scrollable ? (
        <div className={style.scroll}>
          <div className={classNames(style.component, style.scroll, classname)}>{children}</div>
        </div>
      ) : (
        <div className={classNames(style.component, classname)}>{children}</div>
      )}
    </>
  );
});

Container.displayName = 'Container';
