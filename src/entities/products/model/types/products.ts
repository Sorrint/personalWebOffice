import { type IStoreProduct } from '../interfaces/IStoreProduct';

export interface ProductsState {
    entities: IStoreProduct[]
    isLoading: boolean
    error: string
}
