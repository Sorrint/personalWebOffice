import { type FC } from 'react';

import { type IOrderingProductWithExtraData } from '@widgets/documentPageBody';
import { List } from '@shared/ui/list/list';

import { OrderingItem } from '../orderingItem/orderingItem';
import './orderingBody.scss';

interface IOrderingBodyProps {
    products: IOrderingProductWithExtraData[]
}
export const OrderingBody: FC<IOrderingBodyProps> = ({ products }) => {
    return (
        <>
            <List
                items={products}
                renderItem={(item: IOrderingProductWithExtraData) => (
                    <div className="ordering__item" key={item._id}>
                        <OrderingItem item={item} />
                    </div>
                )}
            ></List>
        </>
    );
};
