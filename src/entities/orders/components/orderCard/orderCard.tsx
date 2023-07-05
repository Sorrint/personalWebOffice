import { Children, FC, ReactNode } from 'react';

import { getCurrentOrder } from '@entities/orders/model/OrderSlice';
import { useAppSelector } from '@shared/lib/hooks';
import { hasComponentName } from '@shared/lib/utils/hasComponentName';
import { Table } from '@shared/ui/table';

import './orderCard.scss';
import { IOrder } from '@entities/orders/model/interfaces/IOrder';

interface IOrderCardProps {
    children?: ReactNode;
    order: IOrder | undefined;
}

const OrderCard: FC<IOrderCardProps> = ({ children, order }) => {
    const actions = children
        ? Children.toArray(children).filter((child) => hasComponentName(child, 'OrderActions'))
        : null;

    const tableHeaders = {
        number: '№',
        productName: 'Товары (работы, услуги)',
        count: 'Количество',
        unit: 'Ед.'
    };

    return (
        <>
            {order ? (
                <>
                    {actions}
                    <div className="order__title">{order.orderName}</div>
                    <Table headers={tableHeaders} data={order.products} />
                </>
            ) : (
                <div className="order__title">Не выбран заказ</div>
            )}
        </>
    );
};

export default OrderCard;
