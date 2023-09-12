import { List } from '@shared/ui/list/list';

import { OrderingItem } from '../orderingItem/orderingItem';
import './orderingBody.scss';
import { type IOrderingContent, type IOrderingProduct } from '@entities/orderings/model/types/ordering';

interface IOrderingBodyProps {
    content: IOrderingContent[]
}
export const OrderingBody  = (props: IOrderingBodyProps) => {
    const {content} = props;

    return (
        <>
            {content && content.map((item, index)=> (
                <div className='ordering__section' key={index}>
                    <List
                        items={item.products}
                        renderItem={(item: IOrderingProduct) => (
                            <div className="ordering__item" key={`${item._id}${item.orderNumber}`}>
                                <OrderingItem item={item} />
                            </div>
                        )}
                    />
                    <div className="ordering__item ordering__resultRow">
                        <div className="ordering__cell item__number"/>
                        <div className="ordering__cell item__countInRow">{item.summary?.countInRow ? `В ряду ${item.summary?.countInRow} шт.` : ''}</div>
                        <div className="ordering__cell item__summaryCount">{item.summary?.sum}</div>
                        <div className="ordering__cell item__unit"/>
                        <div className="ordering__cell item__summaryRows">{item.summary?.rows && item.summary.countInRow ? `${item.summary.rows} рядов = ${item.summary.rows * item.summary.countInRow} шт.` : ''}</div>
                    </div>
                </div>
            ))}
        </>);
};
