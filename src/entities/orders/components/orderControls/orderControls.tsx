import { type ReactNode } from 'react';

import './orderControls.scss';

interface OrderActionProps {
    children?: ReactNode
}

export const OrderControls = ({ children }: OrderActionProps) => {
    return <div className="order__actions">{children}</div>;
};
