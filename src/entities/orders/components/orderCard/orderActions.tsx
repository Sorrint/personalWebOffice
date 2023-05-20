import { FC, ReactNode } from 'react';

import './orderActions.scss';
interface IOrderActionProps {
    children?: ReactNode;
}

const OrderActions: FC<IOrderActionProps> = ({ children }) => {
    return <div className="order__actions">{children}</div>;
};

export default OrderActions;
