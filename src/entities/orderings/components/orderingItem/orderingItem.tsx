import { type FC } from 'react';

import { type IOrderingProductWithExtraData } from '@widgets/documentPageBody';

import './orderingItem.scss';

interface IOrderingItemProps {
    item: IOrderingProductWithExtraData
}

export const OrderingItem: FC<IOrderingItemProps> = ({ item }) => {
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
