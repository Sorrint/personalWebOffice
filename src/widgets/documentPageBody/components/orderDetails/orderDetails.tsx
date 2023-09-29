import { NavLink, useParams } from 'react-router-dom';
import { type IOrderRecord, OrderCard } from '@entities/orders';

import { useGetOrderByIdQuery } from '../../api/documentsOrderApi';

export const OrderDetails = () => {

    const { _id} = useParams();
    if (!_id) return 'Нет id';
    
    const {data: order, isLoading: orderLoading} = useGetOrderByIdQuery(_id);

    if (orderLoading) return <span>Идет загрузка</span>;
    
    const notAllProducts = order?.orderRecords.some(record=> !record.product) ? true : false;
    
    const transformedRecords: IOrderRecord[] = order?.orderRecords.map(record => (
        {...record, 
            product: record.product?._id, 
            productName: record.product?.name ?? record.productName, 
            unit: record.unit?.description ?? ''
        })) 
        ?? [];
    
    return (
        <>
            <div>
                {notAllProducts && 
                    (
                        <div>
                            <NavLink to={`../../orders/addProducts?orderId=${order?._id}`}>Не все товары найдены в базе данных</NavLink>
                        </div>
                    )
                }
                {order?.ordering 
                    ?         
                    <NavLink to={`../../orderings/${order.ordering}`}>Перейти к порядовке</NavLink> 
                    : 
                    <NavLink to={`../../orderings/create?orderId=${order?._id}`}>Создать порядовку</NavLink>
                }
                {order && transformedRecords && <OrderCard order={{...order, orderRecords: transformedRecords}}/>}
            </div>
        </>
    );
};

