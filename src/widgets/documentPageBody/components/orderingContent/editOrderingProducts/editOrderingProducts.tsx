import { transformProductName, useCheckOrderProducts } from '@entities/products';
import { useSelector } from "react-redux";
import { getCurrentOrder } from "@entities/orders";
import { useEffect } from "react";
import { EditProductCard } from "@entities/products/components/editProductCard/editProductCard";

import './editOrderingProducts.scss';
import type { IStoreProduct } from '@entities/products/model/types/IStoreProduct';

export const EditOrderingProducts = () => {
    // const order = useSelector(getCurrentOrder());
    
    // const [checkOrder, { data: resultCheck, isLoading: isChecking, isError: isCheckError }] =
    //     useCheckOrderProducts();

    // useEffect(() => {
    //     if (order) checkOrder(order.products);
    // }, [order]);
    // console.log(resultCheck);

    // const notFoundProducts = resultCheck?.productsNotExists.map((product) => {
    //     const name = transformProductName(product.productName);

    //     return {name, type: 'COUNTABLE'};
    // });
    const products: IStoreProduct[] = [
        {
            type: 'SCALABLE',
            name:"Грунт БЕТОН-КОНТАКТ с индикатором 12 кг ПРОФИ акриловый Капитель",
            // unit:"шт"
        }, 
        {
            name: "Грунт БЕТОН-КОНТАКТ с индикатором 6 кг ПРОФИ акриловый Капитель",
            // unit: "шт",
            type: 'COUNTABLE'
        }
    ];

    const notFoundProducts = products.map((product) => {
        const name = transformProductName(product.name);
    
        return {...product, name};
    });

    return <div className='editProductsCardsList'>Список товаров
        {notFoundProducts?.map((product) => (
            <EditProductCard product={product} key={product.name} />
        ))}</div>;
};