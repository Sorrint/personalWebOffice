import { createSlice } from '@reduxjs/toolkit';
import { type EditProductFormState } from '../types/EditProductFormState';

export const initialEditFormState: EditProductFormState = {
  product: null,
  formProps: { buttonText: 'Создать', method: 'create', popupText: '' },
};
export const OrderSlice = createSlice({
  name: 'editProductFormSlice',
  initialState: initialEditFormState,
  reducers: {
    setForm: (state, action) => {
      const { product, formProps } = action.payload;
      state.formProps = formProps;
      state.product = product;
    },
  },
});

export const { reducer: editProductFormReducer } = OrderSlice;
export const { actions: editProductFromActions } = OrderSlice;
