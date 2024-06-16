import classNames from 'classnames';
import { type ReactNode, memo, useCallback, useMemo, useState } from 'react';

import style from './panel.module.scss';
import { IconFont } from '../iconFont';

interface PanelProps {
  children: ReactNode;
  className?: string;
  onChange?: (isOpen: boolean) => void;
  open?: boolean;
  title?: string;
}
export const Panel = memo(({ children, className, onChange, open = true, title }: PanelProps) => {
  const [isOpen, setIsOpen] = useState(open);

  const onClick = useCallback(() => {
    setIsOpen(prev => !prev);
    onChange?.(isOpen);
  }, [isOpen, onChange]);

  const showIcon = useMemo(
    () => <IconFont iconName={isOpen ? 'icon-arrow-up' : 'icon-arrow-down'} />,
    [isOpen],
  );
  const componentClass = classNames(style.component, className);

  const renderContent = useCallback(() => {
    if (!title || (title && open === undefined) || (title && open !== undefined && isOpen)) {
      return (
        <div
          className={classNames(style.content, {
            [style['content-top']]: title && isOpen !== undefined,
          })}
        >
          {children}
        </div>
      );
    }
  }, [title, open, isOpen, children]);

  return (
    <div className={componentClass}>
      {title && (
        <div className={style.head} onClick={onClick}>
          <h3 className={style.title}>{title}</h3>
          {open !== undefined && showIcon}
        </div>
      )}
      {renderContent()}
    </div>
  );
});
Panel.displayName = 'Panel';
