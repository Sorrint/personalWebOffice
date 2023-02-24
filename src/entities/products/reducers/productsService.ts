import { RootState } from './../../../shared/lib/store/types.d';
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
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/dreamkass/products`,
        prepareHeaders: (headers) => {
            // 387f24a2-c217-43ea-b8eb-2cf3089ea9ee
            headers.set('authorization', `Bearer ${localStorage.getItem('dreamToken')} `);
            return headers;
        }
    }),

    endpoints: (build) => ({
        loadProducts: build.query<IProduct[], number>({
            query: (limit) => ({ url: `/` })
        }),
        loadProductBySearch: build.query<IProduct[], IParams>({
            query: (params) => ({
                url: `/search?q=${encodeURI(params.q)}&limit=${params.limit}`
            }),
            transformResponse: (response: ISearchResult) => {
                return response.products;
            }
        }),
        loadProductsCategories: build.query<IStoreView, IParams>({
            query: (params) => ({
                url: `/categories`
            })
        })
    })
});
