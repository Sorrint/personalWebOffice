import { type ReactNode } from 'react';

import styles from './orderControls.module.scss';

interface OrderActionProps {
    children?: ReactNode
}

export const OrderControls = ({ children }: OrderActionProps) => {
    return <div className={styles.actions}>{children}</div>;
};
