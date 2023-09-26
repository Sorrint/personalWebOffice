import { useSearchParams } from 'react-router-dom';

import { EditProductCard } from "@features/editProductCard";

import { useGetOrderByIdQuery } from "../../api/documentsOrderApi";
import './addOrderProducts.scss';

export const AddOrderProducts = () => {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');

    if (!orderId) return 'Нет id заказа';

    const {data: order, isLoading} = useGetOrderByIdQuery(orderId);
    
    if (isLoading) return <div>Идет загрузка</div>;
    const productsWithoutId = order?.orderRecords.filter(record => !record.product) || [];

    return <div className='editProductsCardsList'>Список товаров
        {productsWithoutId?.map((product) => (
            <EditProductCard product={{...product, name: product.productName}} key={product.productName} />
        ))}
    </div>;
};