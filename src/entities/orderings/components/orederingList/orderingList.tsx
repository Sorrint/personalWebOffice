import { OrderingHeader } from '../orderingHeader/orderingHeader';
import { OrderingBody } from '../orderingBody/orderingBody';
import { type IOrdering} from '@entities/orderings/model/types/ordering';

interface IOrderingListProps {
    ordering: IOrdering
}
export const OrderingList = (props: IOrderingListProps) => {
    const {ordering} = props;
    return (
        <div className="ordering">
            <OrderingHeader />
            <OrderingBody content={ordering.content} />
        </div>
    );
};
