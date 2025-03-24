import { type StoreProduct } from './StoreProduct';

export interface ProductsState {
  entities: StoreProduct[];
  isLoading: boolean;
  error: string;
}
