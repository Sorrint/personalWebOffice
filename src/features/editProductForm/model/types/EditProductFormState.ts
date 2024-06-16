import { type IInventoryProduct } from '@entities/inventoryDocs';
import { type IFormProps } from './EditProductForm';

export interface EditProductFormState {
  product: IInventoryProduct | null;
  formProps: IFormProps;
}
