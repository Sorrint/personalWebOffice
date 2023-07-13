import { type FieldValues } from 'react-hook-form';
import { type IInventoryDocs } from '../model/types';
import { rtkApi } from '@shared/api/rtkApi';

const baseInventoryUri = 'inventory-list';

const inventoryDocsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createNewDocument: build.mutation<IInventoryDocs, FieldValues>({
            query: (document) =>
                ({ url: `${baseInventoryUri}/create`, method: 'POST', body: document })
        }),
        loadAllDocuments: build.query<IInventoryDocs[], Record<string, unknown>>({
            query: () =>
                ({ url: `${baseInventoryUri}`, method: 'GET' })
        }),
        updateProducts: build.mutation<IInventoryDocs, { product: FieldValues, docNumber: number }>({
            query: ({ product, docNumber }) =>
                ({ url: `${baseInventoryUri}/addProduct/${docNumber}`, method: 'PATCH', body: product })
        }),
        loadDocumentByNumber: build.query<IInventoryDocs, string>({
            query: (docNumber) =>
                ({ url: `${baseInventoryUri}/${docNumber}`, method: 'GET' })
        }),
        removeInventoryProduct: build.mutation<IInventoryDocs, { id: string | undefined, docNumber: number }>({
            query: ({ id, docNumber }) =>
                ({ url: `${baseInventoryUri}/deleteProduct/${docNumber}`, method: 'DELETE', body: { id } })
        })
    })
});

export const useCreateNewDocument = inventoryDocsApi.useCreateNewDocumentMutation;

export const useLoadAllDocuments = inventoryDocsApi.useLoadAllDocumentsQuery;

export const useLoadDocumentByNumber = inventoryDocsApi.useLoadDocumentByNumberQuery;

export const useRemoveInventoryProduct = inventoryDocsApi.useRemoveInventoryProductMutation;

export const useUpdateProducts = inventoryDocsApi.useUpdateProductsMutation;
