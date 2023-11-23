import { memo } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';

import { isHiddenSidebar } from '../../model/selectors/sidebarSelectors';
import { sidebarActions } from '../../model/slices/sidebarSlice';
import styles from './sidebarControlButton.module.scss';

export const SidebarControlButton = memo(() => {
    const dispatch = useAppDispatch()
    const hideSidebar=()=> dispatch(sidebarActions.changeVisible())
    const visible = useAppSelector(isHiddenSidebar) ?? false

    return (
        <div>
            <i className={classNames(styles.burger, {[styles.close]: visible})} onClick={hideSidebar}>
                <span></span>
            </i>
        </div>
    );
});