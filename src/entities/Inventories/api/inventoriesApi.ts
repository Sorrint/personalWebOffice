import { type FieldValues } from 'react-hook-form';
import { type CreateInventory, type InventoryDocs } from '../model/types';
import { rtkApi } from '@shared/api/rtkApi';
import { transformInventoriesList } from '@widgets/InventoryPageBody/lib/helpers/transformInventoriesList';
import { AppLinkItem } from '@shared/ui/AppLinksList';

const baseInventoryUri = 'inventory-list';

const inventoryDocsApi = rtkApi
  .enhanceEndpoints({ addTagTypes: ['inventoryContent'] })
  .injectEndpoints({
    endpoints: build => ({
      createNewDocument: build.mutation<InventoryDocs, CreateInventory>({
        query: document => ({ url: `${baseInventoryUri}/create`, method: 'POST', body: document }),
        invalidatesTags: ['inventoryContent'],
      }),

      loadAllInventories: build.query<AppLinkItem[], Record<string, unknown>>({
        query: () => ({ url: `${baseInventoryUri}`, method: 'GET' }),
        transformResponse: transformInventoriesList,
        providesTags: () => ['inventoryContent'],
      }),

      updateProducts: build.mutation<InventoryDocs, { product: FieldValues; docNumber: number }>({
        query: ({ product, docNumber }) => ({
          url: `${baseInventoryUri}/addProduct/${docNumber}`,
          method: 'PATCH',
          body: product,
        }),
        invalidatesTags: ['inventoryContent'],
      }),

      loadDocumentByNumber: build.query<InventoryDocs, string | undefined>({
        query: docNumber => ({ url: `${baseInventoryUri}/${docNumber}`, method: 'GET' }),
        providesTags: () => ['inventoryContent'],
      }),

      removeInventoryProduct: build.mutation<
        InventoryDocs,
        { id: string | undefined; docNumber: number }
      >({
        query: ({ id, docNumber }) => ({
          url: `${baseInventoryUri}/deleteProduct/${docNumber}`,
          method: 'DELETE',
          body: { id },
        }),
        invalidatesTags: ['inventoryContent'],
      }),
    }),
  });

export const {
  useCreateNewDocumentMutation: useCreateInventory,
  useLoadAllInventoriesQuery: useLoadAllInventories,
  useLoadDocumentByNumberQuery: useLoadDocumentByNumber,
  useRemoveInventoryProductMutation: useRemoveInventoryProduct,
  useUpdateProductsMutation: useUpdateProducts,
} = inventoryDocsApi;
