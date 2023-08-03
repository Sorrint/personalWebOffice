import { type FC } from 'react';


import './orderingItem.scss';
import { type IOrderingProduct } from '@entities/orderings/model/types/ordering';

interface IOrderingItemProps {
    item: IOrderingProduct
}

export const OrderingItem: FC<IOrderingItemProps> = ({ item }) => {
    const { count, unit, orderNumber, name } = item;
    return (
        <>
            <div className="ordering__cell item__number">{orderNumber}</div>
            <div className="ordering__cell item__productName">{name}</div>
            <div className="ordering__cell item__count">{count}</div>
            <div className="ordering__cell item__unit">{unit}</div>
            <div className="ordering__cell item__rows"/>
        </>
    );
};
