import { OrderingHeader } from '../orderingHeader/orderingHeader';
import { OrderingBody } from '../orderingBody/orderingBody';
import { type IOrdering} from '@entities/orderings/model/types/ordering';

interface IOrderingListProps {
    // products: IOrderingProduct[]
    ordering: IOrdering
}
export const OrderingList = (props: IOrderingListProps) => {
    const {ordering} = props;
    console.log(ordering);
    return (
        <div className="ordering">
            <OrderingHeader />
            <OrderingBody content={ordering.content} />
        </div>
    );
};
