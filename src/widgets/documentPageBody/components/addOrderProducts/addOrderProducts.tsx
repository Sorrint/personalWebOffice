import { useSearchParams } from 'react-router-dom';

import { EditProductCard } from '@features/editProductCard';
import { type IStoreProduct } from '@entities/products';

import { useUpdateOrderRecordMutation } from '../../api/documentsOrderApi';
import styles from './addOrderProducts.module.scss';
import { useGetOrderByIdQuery } from '@features/getOrderProductsWeight';

export const AddOrderProducts = () => {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');

    if (!orderId) return 'Нет id заказа';

    const {data: order, isLoading} = useGetOrderByIdQuery(orderId);
    const [updateRecord] = useUpdateOrderRecordMutation();
    
    if (isLoading) return <div>Идет загрузка</div>;
    const productsWithoutId = order?.orderRecords.filter(record => !record.product) || [];

    const handleSubmit = (createdProduct: IStoreProduct, recordNumber: number) => {
        updateRecord({
            record: {number: recordNumber, product: createdProduct._id, unit: createdProduct.unit}, 
            id: orderId });
        return;
    };

    return <div className={styles['cards-list']}>Список товаров
        {productsWithoutId?.map((product) => (
            <EditProductCard product={{...product, name: product.productName, unit: product.unit?._id}} key={product.productName} onSubmit={(createdProduct)=> handleSubmit(createdProduct, product.number)}/>
        ))}
    </div>;
};