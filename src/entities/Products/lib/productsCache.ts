import { getFromCache, isCacheValid, registerStore, saveToCache } from '@shared/lib/idb';
import type { DreamkasProduct } from '../model/types/DreamkasProduct';

const STORE = 'products';
const TTL_MS = 3 * 24 * 60 * 60 * 1000;

registerStore(STORE);

export const isProductsCacheValid = () => isCacheValid(STORE, TTL_MS);

export const saveProducts = (products: DreamkasProduct[]) => saveToCache(STORE, products);

export const getAllCachedProducts = () => getFromCache<DreamkasProduct>(STORE);

export const searchProducts = async (query: string): Promise<DreamkasProduct[]> => {
  const all = await getFromCache<DreamkasProduct>(STORE);
  if (!query) return all;

  const q = query.toLowerCase();
  return all.filter(
    p =>
      p.name?.toLowerCase().includes(q) ||
      p.barcodes?.some(b => b.includes(q)) ||
      p.department?.name?.toLowerCase().includes(q),
  );
};
