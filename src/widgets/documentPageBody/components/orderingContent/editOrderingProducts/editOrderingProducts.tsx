import { transformProductName, useCheckOrderProducts } from '@entities/products';
import { useEffect } from "react";

import { EditProductCard } from "@features/editProductCard/editProductCard";

import { useSearchParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../api/documentsOrderApi';
import './editOrderingProducts.scss';

export const EditOrderingProducts = () => {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');

    if (!orderId) return 'Нет id заказа';

    const {data: order} = useGetOrderByIdQuery(orderId);
    const [checkOrder, { data: resultCheck }] =
        useCheckOrderProducts();

    useEffect(() => {
        if (order) checkOrder(order.orderRecords);
    }, [order]);

    const notFoundProducts = resultCheck?.productsNotExists.map((product) => {
        const name = transformProductName(product.productName);
        return {...product, name };
    });

    return <div className='editProductsCardsList'>Список товаров
        {notFoundProducts?.map((product) => (
            <EditProductCard product={product} key={product.name} />
        ))}</div>;
};