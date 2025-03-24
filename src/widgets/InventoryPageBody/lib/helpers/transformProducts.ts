import { type DreamkasProduct } from '@entities/Products/model/types/DreamkasProduct';
import { type InventoryProduct } from '@entities/Inventories';

export const transformProducts = (
  products?: DreamkasProduct[],
  isActiveAccount?: boolean,
): InventoryProduct[] => {
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
