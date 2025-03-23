import { type IInventoryProduct } from '@entities/Inventories';
import { type IFormProps } from './EditProductForm';

export interface EditProductFormState {
  product: IInventoryProduct | null;
  formProps: IFormProps;
}
