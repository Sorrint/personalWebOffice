import { Children, type ReactNode } from 'react';

import { hasComponentName } from '@shared/lib/utils';
import { Table } from '@shared/ui/table';

import { type IOrder } from '../../model/types/IOrder';
import './orderCard.scss';
interface IOrderCardProps {
    children?: ReactNode
    order?: IOrder
}

export const OrderCard = ({ children, order }: IOrderCardProps) => {
    
    if (!order) return null;
    const actions = children ?? Children.toArray(children).filter((child) => hasComponentName(child, 'OrderActions'));

    const tableHeaders = {
        number: '№',
        productName: 'Товары (работы, услуги)',
        count: 'Количество',
        unit: 'Ед.'
    };

    return (
        <>
            {order && 
                 (<>
                     {actions}
                     <div className="order__title">{order.orderName}</div>
                     <Table headers={tableHeaders} data={order.products} />
                 </>)}
        </>
    );
};
