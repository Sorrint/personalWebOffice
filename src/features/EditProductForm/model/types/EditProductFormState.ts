import { type InventoryProduct } from '@entities/Inventories';
import { type FormProps } from './EditProductForm';

export interface EditProductFormState {
  product: InventoryProduct | null;
  formProps: FormProps;
}
