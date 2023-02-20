import { IProduct, IProductCategory, IProductQueryTrace } from '../model/IProducts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IParams {
    limit: number;
    q: string;
}

interface ISearchResult {
    categories: IProductCategory[];
    products: IProduct[];
    _queryTrace: IProductQueryTrace[];
}

interface IStoreView {
    categories: IProductCategory[];
    totalProductCount: number;
    _queryTrace: IProductQueryTrace[];
}

export const productsAPI = createApi({
    reducerPath: 'ProductsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/dreamkass/products` }),
    endpoints: (build) => ({
        loadProducts: build.query<IProduct[], number>({
            query: (limit) => ({ url: `/` })
        }),
        loadProductBySearch: build.query<ISearchResult, IParams>({
            query: (params) => ({
                url: `/search?q=${encodeURI(params.q)}&limit=${params.limit}`
            })
        }),
        loadProductsCategories: build.query<IStoreView, IParams>({
            query: (params) => ({
                url: `/categories`
            })
        })
    })
});
