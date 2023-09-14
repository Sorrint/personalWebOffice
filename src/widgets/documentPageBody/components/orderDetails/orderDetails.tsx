import { NavLink, useParams } from 'react-router-dom';

import { OrderCard } from '@entities/orders';

import { useGetOrderByIdQuery } from '../../api/documentsOrderApi';

export const OrderDetails = () => {
    const { _id} = useParams();
    if (!_id) return 'Нет id';
    
    const {data: order, isLoading} = useGetOrderByIdQuery(_id);
    if (isLoading) return <span>Идет загрузка</span>;
    
    const productsWithoutId = order?.orderRecords.filter(record => !record.productId) || [];
    
    return (
        <>
            <div>
                {productsWithoutId?.length > 0 && 
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
                {order && <OrderCard order={order}/>}
            </div>
        </>
    );
};

