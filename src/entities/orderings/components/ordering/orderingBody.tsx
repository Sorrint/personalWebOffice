import { FC } from 'react';
import { IStoreProduct } from '@entities/products/model/interfaces/IStoreProduct';
import List from '@shared/ui/list/list';
import { IOrderProduct } from '@entities/products/model/interfaces/IOrderProduct';
import OrderingItem from './orderingItem';
import { IOrderingProductWithExtraData } from '@widgets/documentPageBody/libs/extraDataTypeGuard';

interface IOrderingBodyProps {
    products: IOrderingProductWithExtraData[];
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
