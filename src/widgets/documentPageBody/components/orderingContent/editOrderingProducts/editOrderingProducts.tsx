import { transformProductName, useCheckOrderProducts } from '@entities/products';
import { useSelector } from "react-redux";
import { getCurrentOrder } from "@entities/orders";
import { useEffect } from "react";
import { EditProductCard } from "@entities/products/components/editProductCard/editProductCard";

import './editOrderingProducts.scss';

export const EditOrderingProducts = () => {
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