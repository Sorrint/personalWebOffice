import { useParams } from 'react-router-dom';

import { EditProductCard } from '@features/editProductCard';
// import { type IStoreProduct } from '@entities/products';

import styles from './AddOrderProducts.module.scss';
import { useGetOrderRecords } from '@entities/orders';
import { useUpdateOrderRecords } from '@widgets/documentsPageBody/api/documentsOrderApi';

export const AddOrderProducts = () => {
  const { orderNumber } = useParams();

  const { data: productsWithoutId, isLoading: orderRecordsLoading } = useGetOrderRecords(
    { orderNumber: Number(orderNumber), excludeFilledProducts: true },
    { skip: !orderNumber },
  );

  // const [updateRecord] = useUpdateOrderRecords();

  if (orderRecordsLoading) return <div>Идет загрузка</div>;
  console.log(productsWithoutId);

  // const handleSubmit = (createdProduct: IStoreProduct, recordNumber: number) => {
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
