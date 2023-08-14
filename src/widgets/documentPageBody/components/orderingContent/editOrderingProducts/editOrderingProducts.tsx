import { transformProductName, useCheckOrderProducts } from '@entities/products';
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { getCurrentOrder, loadOrderById } from "@entities/orders";
import { EditProductCard } from "@features/editProductCard/editProductCard";
import { useAppDispatch } from '@shared/lib/hooks';

import './editOrderingProducts.scss';
import { useSearchParams } from 'react-router-dom';

export const EditOrderingProducts = () => {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');

    const dispatch = useAppDispatch();
    useEffect(()=> {
        orderId && dispatch(loadOrderById(orderId));
    }, [orderId]);
    
    const order = useSelector(getCurrentOrder());
    const [checkOrder, { data: resultCheck }] =
        useCheckOrderProducts();

    useEffect(() => {
        if (order) checkOrder(order.products);
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