import { type FC } from 'react';

import { type IOrderingProductWithExtraData } from '@widgets/documentPageBody';

import { OrderingHeader } from '../orderingHeader/orderingHeader';
import { OrderingBody } from '../orderingBody/orderingBody';

interface IOrderingListProps {
    products: IOrderingProductWithExtraData[]
}
export const OrderingList: FC<IOrderingListProps> = ({ products }) => {
    return (
        <div className="ordering">
            <OrderingHeader />
            <OrderingBody products={products} />
        </div>
    );
};
