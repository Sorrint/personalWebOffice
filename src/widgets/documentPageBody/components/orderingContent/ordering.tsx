import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useEffect} from 'react';

import { type IOrderingContent } from '@entities/orderings/model/types/ordering';
import { type IOrderingProduct, OrderingList } from '@entities/orderings';
import { getCurrentOrder, loadOrderById } from '@entities/orders';
import { useCheckOrderProducts } from '@entities/products';
import { useGetPackageCategories, useGetPackages } from '@entities/packages';
import { useAppDispatch } from '@shared/lib/hooks';

import { hasExtraData } from '../../libs/extraDataTypeGuard';
import './ordering.scss';

export const Ordering = () => {

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');

    const dispatch = useAppDispatch();
    useEffect(()=> {
        orderId && dispatch(loadOrderById(orderId));
    }, [orderId]);
    
    const order = useSelector(getCurrentOrder());
    const { data: packages } = useGetPackages();
    const { data: packageCategories } = useGetPackageCategories();
    
    const [checkOrder, { data: resultCheck, isLoading: isChecking, isError: isCheckError }] =
        useCheckOrderProducts();

    useEffect(() => {
        if (order) checkOrder(order.products);
    }, [order]);

    const orderingProducts = resultCheck?.productsExists.filter((item): item is IOrderingProduct => hasExtraData(item));

    const content = packageCategories?.reduce((result: IOrderingContent[], category)=> {
        const filteredProducts = orderingProducts?.filter((product)=> product.extraData?.package === category.packageId);
        if (filteredProducts && filteredProducts?.length) {
            const count = filteredProducts.reduce((sum, product)=> (sum + product.count), 0);
            result.push({
                package: category._id, 
                products: filteredProducts, 
                summary: {
                    sum: count, 
                    countInRow: category.countOfPackages, 
                    rows: category.countOfPackages ? `${Math.floor(count/category.countOfPackages)}` : ''
                }});
        }
        return result;
    }, []);

    return (
        <>
            {isCheckError && <>Ошибка c подключением</>}
            {isChecking && <>&lsquo;Идет проверка документа&lsquo;</>}

            <div>Порядовка</div>
            {content && (<OrderingList ordering={{orderName: order?.orderName || '', content: content}}/>)}
            {resultCheck && orderId && <NavLink to={`../editOrderingProducts?orderId=${orderId}`}>
            Перейти к списку
            </NavLink>}
        </>
    );
};