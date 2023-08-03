import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { type IOrderingProduct, OrderingList } from '@entities/orderings';
import { useCheckOrderProducts } from '@entities/products';
import { useGetPackages } from '@entities/packages';
import { getCurrentOrder } from '@entities/orders';

import { hasExtraData } from '../../libs/extraDataTypeGuard';
import './ordering.scss';
import { type IOrderingContent } from '@entities/orderings/model/types/ordering';

export const Ordering = () => {
    const order = useSelector(getCurrentOrder());
    const { data: packages } = useGetPackages();
    
    const [checkOrder, { data: resultCheck, isLoading: isChecking, isError: isCheckError }] =
        useCheckOrderProducts();

    useEffect(() => {
        if (order) checkOrder(order.products);
    }, [order]);

    const orderingProducts =
        resultCheck?.productsExists.filter((item): item is IOrderingProduct => hasExtraData(item));

    const content = packages?.reduce((result: IOrderingContent[], pack) => {
        const filteredProducts = orderingProducts?.filter((product)=> product.extraData?.package === pack._id);
        if (filteredProducts && filteredProducts?.length) {
            const count = filteredProducts.reduce((sum, product)=> (sum + product.count), 0);
            result.push({package: pack._id, products: filteredProducts, summary: {sum: count}});
        }
        return result;
    },
    []);
    // const ordering: IOrdering = {orderName: 'Заказ №1', content: content ?? []};

    return (
        <>
            {isCheckError && <>Ошибка c подключением</>}
            {isChecking && <>&lsquo;Идет проверка документа&lsquo;</>}

            <div>Порядовка</div>
            {content && (<OrderingList ordering={{orderName: 'Заказ №1', content: content}}/>)}
            {resultCheck && <NavLink to={"/office/documents/editOrderingProducts"}>
            Перейти к списку
            </NavLink>}

        </>
    );
};