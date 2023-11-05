import { Children, type ReactNode } from 'react';

import { hasComponentName } from '@shared/lib/utils';
import { Table } from '@shared/ui/table';

import { type IOrder } from '../../model/types/IOrder';
import styles from './orderCard.module.scss';
interface OrderCardProps {
    children?: ReactNode
    order?: IOrder
}

export const OrderCard = ({ children, order }: OrderCardProps) => {
    
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
                     <div className={styles.title}>{order.orderName}</div>
                     <Table headers={tableHeaders} data={order.orderRecords} />
                 </>)}
        </>
    );
};
