import { type FC, type ReactNode } from 'react';

import './orderActions.scss';

interface IOrderActionProps {
    children?: ReactNode
}

export const OrderActions: FC<IOrderActionProps> = ({ children }) => {
    return <div className="order__actions">{children}</div>;
};
