import { type StoreSchema } from '@app/providers/storeProvider';
import { initialEditFormState } from '../slices/EditProductFormSlice';

export const selectFormProps = (state: StoreSchema) =>
  state.editProductForm?.formProps || initialEditFormState.formProps;

export const selectFormProduct = (state: StoreSchema) => state.editProductForm?.product || null;
