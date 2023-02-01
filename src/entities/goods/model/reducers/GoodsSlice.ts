import { createSlice } from '@reduxjs/toolkit';
import { IGoods } from '../IGoods';

interface GoodsState {
    entities: IGoods[];
    isLoading: boolean;
    error: string;
}

const initialState: GoodsState = {
    entities: [],
    isLoading: true,
    error: ''
};

export const GoodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        goodsRequested: (state) => {
            state.isLoading = true;
        },
        goodsRequestedSuccess: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.entities = action.payload;
        },
        goodsRequestedFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default GoodsSlice.reducer;
