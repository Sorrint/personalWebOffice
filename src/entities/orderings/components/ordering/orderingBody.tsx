import { type FC } from 'react';
import { List } from '@shared/ui/list/list';
import OrderingItem from './orderingItem';
import { type IOrderingProductWithExtraData } from '@widgets/documentPageBody/libs/extraDataTypeGuard';

interface IOrderingBodyProps {
    products: IOrderingProductWithExtraData[]
}
const OrderingBody: FC<IOrderingBodyProps> = ({ products }) => {
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

export default OrderingBody;
