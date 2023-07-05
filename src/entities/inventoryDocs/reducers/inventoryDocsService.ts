import { FieldValues } from 'react-hook-form';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IInventoryDocs } from '../model/types';
import { SERVER_URI } from '@app/config/apiConfig';

export const inventoryDocsAPI = createApi({
    reducerPath: 'inventoryDocsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://${SERVER_URI}/inventory-list` }),
    tagTypes: ['inventoryList', 'allInventories'],
    endpoints: (build) => ({
        createNewDocument: build.mutation<IInventoryDocs, FieldValues>({
            query: (document) => ({ url: `/create`, method: 'POST', body: document }),
            invalidatesTags: (result) => ['allInventories']
        }),
        loadAllDocuments: build.query<IInventoryDocs[], void>({
            query: () => ({ url: `/`, method: 'GET' }),
            providesTags: (result) => ['allInventories']
        }),
        updateProducts: build.mutation<IInventoryDocs, { product: FieldValues; docNumber: number }>({
            query: ({ product, docNumber }) => ({ url: `addProduct/${docNumber}`, method: 'PATCH', body: product }),
            invalidatesTags: (result) => ['inventoryList']
        }),
        loadDocumentByNumber: build.query<IInventoryDocs, string>({
            query: (docNumber) => ({ url: `${docNumber}`, method: 'GET' }),
            providesTags: (result) => ['inventoryList']
        }),
        removeInventoryProduct: build.mutation<IInventoryDocs, { id: string | undefined; docNumber: number }>({
            query: ({ id, docNumber }) => ({ url: `deleteProduct/${docNumber}`, method: 'DELETE', body: { id } }),
            invalidatesTags: (result) => ['inventoryList']
        })
    })
});
