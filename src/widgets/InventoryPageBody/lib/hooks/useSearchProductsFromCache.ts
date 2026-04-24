import { useState, useCallback } from 'react';
import { searchProducts } from '@entities/Products';
import { transformProducts } from '../helpers/transformProducts';
import type { InventoryProduct } from '@entities/Inventories';

export const useSearchProductsFromCache = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [goods, setGoods] = useState<InventoryProduct[]>([]);

  const search = useCallback(async (query: string): Promise<InventoryProduct[]> => {
    if (!query) {
      setGoods([]);
      return [];
    }
    setIsFetching(true);
    try {
      const products = await searchProducts(query);
      const transformed = transformProducts(products);
      setGoods(transformed);
      return transformed;
    } finally {
      setIsFetching(false);
    }
  }, []);

  return { goods, isFetching, search };
};
