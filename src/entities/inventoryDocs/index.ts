export { InventoryList } from './components/inventoryList/inventoryList';
export { InventoryContent } from './components/inventoryContent/inventoryContent';

export { type IInventoryProduct, type IInventoryDocs } from './model/types';

export { useCreateNewDocument, useLoadAllDocuments, useLoadDocumentByNumber, useRemoveInventoryProduct, useUpdateProducts } from './reducers/inventoryDocsService';
