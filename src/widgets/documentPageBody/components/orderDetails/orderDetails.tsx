import { useParams } from 'react-router-dom';
import { type IOrderRecord, OrderCard } from '@entities/orders';
import { useGetOrderByIdQuery } from '@features/getOrderProductsWeight';
import { AppLink } from '@shared/ui/appLink';


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
                            <AppLink to={`../../orders/addProducts?orderId=${order?._id}`}>Не все товары найдены в базе данных</AppLink>
                        </div>
                    )
                }
                {order?.ordering 
                    ?         
                    <AppLink to={`../../orderings/${order.ordering}`}>Перейти к порядовке</AppLink> 
                    : 
                    <AppLink to={`../../orderings/create?orderId=${order?._id}`}>Создать порядовку</AppLink>
                }
                {order && transformedRecords && <OrderCard order={{...order, orderRecords: transformedRecords}}/>}
            </div>
        </>
    );
};

