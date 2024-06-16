import { type ReactNode, memo } from 'react';
import classNames from 'classnames';

import style from './ScrollableBlock.module.scss';

interface ScrollableBlockProps {
  classname?: string;
  scrollable?: boolean;
  children: ReactNode;
}

export const ScrollableBlock = memo(({ classname, children }: ScrollableBlockProps) => {
  return (
    <div className={style.grid}>
      <div className={style.scroll}>
        <div className={classNames(style.component, classname)}>{children}</div>
      </div>
    </div>
  );
});
