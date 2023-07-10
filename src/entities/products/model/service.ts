import { type IDreamkasProduct, type IProductCategory, type IProductQueryTrace } from './interfaces/IDreamkasProduct';

export interface ISearchParams {
    limit: number
    q: string
}

export interface ISearchResult {
    categories: IProductCategory[]
    products: IDreamkasProduct[]
    _queryTrace: IProductQueryTrace[]
}

export interface IProductListParams {
    limit?: number
    offset?: number
}
