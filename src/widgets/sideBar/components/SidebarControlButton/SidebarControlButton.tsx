import { memo } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

import { isHiddenSidebar } from '../../model/selectors/sidebarSelectors';
import { sidebarActions } from '../../model/slices/sidebarSlice';
import style from './SidebarControlButton.module.scss';

export const SidebarControlButton = memo(() => {
  const dispatch = useAppDispatch();
  const hideSidebar = () => dispatch(sidebarActions.changeVisible());
  const visible = useAppSelector(isHiddenSidebar) ?? false;

  return (
    <div>
      <i className={classNames(style.burger, { [style.close]: visible })} onClick={hideSidebar}>
        <span></span>
      </i>
    </div>
  );
});

SidebarControlButton.displayName = 'SidebarControlButton';
