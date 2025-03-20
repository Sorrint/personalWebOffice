import { type ReactNode, memo } from 'react';
import classNames from 'classnames';

import style from './ScrollableBlock.module.scss';

interface ScrollableBlockProps {
  className?: string;
  scrollable?: boolean;
  children: ReactNode;
}

export const ScrollableBlock = memo(({ className, children }: ScrollableBlockProps) => {
  return (
    <div className={style.grid}>
      <div className={style.scroll}>
        <div className={classNames(style.component, className)}>{children}</div>
      </div>
    </div>
  );
});
