import { FieldValues } from 'react-hook-form';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IInventoryDocs } from '../model/types';

export const inventoryDocsAPI = createApi({
    reducerPath: 'inventoryDocsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/inventory-list` }),
    endpoints: (build) => ({
        createNewDocument: build.mutation<IInventoryDocs, FieldValues>({
            query: (document) => ({ url: `/create`, method: 'POST', body: document })
        }),
        loadAllDocuments: build.query<IInventoryDocs[], void>({
            query: () => ({ url: `/`, method: 'GET' })
        }),
        updateProducts: build.mutation<IInventoryDocs, { product: FieldValues; docNumber: number }>({
            query: ({ product, docNumber }) => ({ url: `update/${docNumber}`, method: 'PATCH', body: product })
        }),
        loadDocumentByNumber: build.query<IInventoryDocs, string>({
            query: (docNumber) => ({ url: `${docNumber}`, method: 'GET' })
        })
    })
});
