/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom';

import { EditProductCard } from '@features/EditProductCard';
// import { type StoreProduct } from '@entities/Products';

import styles from './AddOrderProducts.module.scss';
import { useGetOrderRecords } from '@entities/Orders';
import { useUpdateOrderRecords } from '@widgets/DocumentsPageBody/api/documentsOrderApi';

export const AddOrderProducts = () => {
  const { orderNumber } = useParams();

  const { data: productsWithoutId, isLoading: orderRecordsLoading } = useGetOrderRecords(
    { orderNumber: Number(orderNumber), excludeFilledProducts: true },
    { skip: !orderNumber },
  );

  // const [updateRecord] = useUpdateOrderRecords();

  if (orderRecordsLoading) return <div>Идет загрузка</div>;
  console.log(productsWithoutId);

  // const handleSubmit = (createdProduct: StoreProduct, recordNumber: number) => {
  //   updateRecord({
  //     record: { number: recordNumber, product: createdProduct._id, unit: createdProduct.unit },
  //     id: orderId ?? '',
  //   });
  //   return;
  // };
  if (!orderNumber) return 'Нет номера заказа';

  return (
    <div className={styles['cards-list']}>
      Список товаров
      {productsWithoutId?.map(product => (
        <EditProductCard
          product={{ ...product, name: product.productName }}
          key={product.productName}
          // onSubmit={createdProduct => handleSubmit(createdProduct, product.number)}
        />
      ))}
    </div>
  );
};
