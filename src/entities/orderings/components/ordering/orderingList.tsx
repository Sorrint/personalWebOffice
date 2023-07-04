import { IOrderProduct } from 'entities/products/model/interfaces/IOrderProduct';
import { FC } from 'react';
import OrderingHeader from './orderingHeader';
import OrderingBody from './orderingBody';
import { IOrderingProductWithExtraData } from 'widgets/documentPageBody/libs/extraDataTypeGuard';
import './orderingStyles.scss';

interface IOrderingListProps {
    products: IOrderingProductWithExtraData[];
}
const OrderingList: FC<IOrderingListProps> = ({ products }) => {
    return (
        <div className="ordering">
            <OrderingHeader />
            <OrderingBody products={products} />
        </div>
    );
};

export default OrderingList;
