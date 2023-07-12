import { type FC, type ReactNode } from 'react';

import './orderControls.scss';

interface IOrderActionProps {
    children?: ReactNode
}

export const OrderControls: FC<IOrderActionProps> = ({ children }) => {
    return <div className="order__actions">{children}</div>;
};
