import { IProduct, IProductCategory, IProductQueryTrace } from './IProduct';

export interface ISearchParams {
    limit: number;
    q: string;
}

export interface ISearchResult {
    categories: IProductCategory[];
    products: IProduct[];
    _queryTrace: IProductQueryTrace[];
}

export interface IProductListParams {
    limit?: number;
    offset?: number;
}
