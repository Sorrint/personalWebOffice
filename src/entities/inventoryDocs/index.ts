export { InventoryProductsTable } from './components/inventoryProductsTable/inventoryProductsTable';

export { InventoryList } from './components/inventoryList/inventoryList';
// export { InventoryContent } from './components/inventoryContent/inventoryContent';

export * from './model/types';

export {
  useCreateInventory,
  useLoadAllDocuments,
  useLoadDocumentByNumber,
  useRemoveInventoryProduct,
  useUpdateProducts,
} from './reducers/inventoryDocsService';
