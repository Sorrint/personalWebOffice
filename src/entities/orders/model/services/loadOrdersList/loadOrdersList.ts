import { createAsyncThunk } from '@reduxjs/toolkit';
import { type IOrder } from '../../types/IOrder';
import axios from 'axios';
import { type ThunkConfig } from '@app/providers';



export const loadOrdersList = createAsyncThunk<IOrder[], void, ThunkConfig<string>>('orders/loadOrdersList', async (props, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
        const response = await axios.get(`${__SERVER_URI__}/documents/orders`);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
