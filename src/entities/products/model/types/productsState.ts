import { type IStoreProduct } from './IStoreProduct';

export interface ProductsState {
    entities: IStoreProduct[]
    isLoading: boolean
    error: string
}
