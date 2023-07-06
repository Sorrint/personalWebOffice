import { type FC } from 'react';
import { type IOrderingProductWithExtraData } from '@widgets/documentPageBody/libs/extraDataTypeGuard';

interface IOrderingItemProps {
    item: IOrderingProductWithExtraData
}

const OrderingItem: FC<IOrderingItemProps> = ({ item }) => {
    const { count, unit, orderNumber, name } = item;
    return (
        <>
            <div className="ordering__cell item__number">{orderNumber}</div>
            <div className="ordering__cell item__productName">{name}</div>
            <div className="ordering__cell item__count">{count}</div>
            <div className="ordering__cell item__unit">{unit}</div>
        </>
    );
};

export default OrderingItem;
