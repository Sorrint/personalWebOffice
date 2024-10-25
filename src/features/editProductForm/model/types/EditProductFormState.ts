import { type IInventoryProduct } from '@entities/inventories';
import { type IFormProps } from './EditProductForm';

export interface EditProductFormState {
  product: IInventoryProduct | null;
  formProps: IFormProps;
}
