import { type IDreamkasProduct } from './../../../../entities/products/model/types/IDreamkasProduct';
import { type IInventoryProduct } from '@entities/inventoryDocs';

export const transformProducts = (
  products?: IDreamkasProduct[],
  isActiveAccount?: boolean,
): IInventoryProduct[] => {
  const inventoryProducts = products?.map(product => {
    const { name, price, id } = product;
    return {
      name,
      price: price && price / 100,
      quantity: 1,
      id,
      isActiveAccount,
    };
  });
  return inventoryProducts || [];
};
