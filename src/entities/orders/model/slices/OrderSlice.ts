import { type OrderState } from '../types/IOrder';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: OrderState = {};

export const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { reducer: orderReducer } = OrderSlice;
export const { actions: orderActions } = OrderSlice;
