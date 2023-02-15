import { createSlice } from '@reduxjs/toolkit';
import { read, utils } from 'xlsx';
import { AppDispatch } from '../../../shared/lib/store/types';
import { IProduct } from '../model/IProducts';

interface GoodsState {
    entities: IProduct[];
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

const { reducer: goodsReducer, actions } = GoodsSlice;
const { goodsRequested, goodsRequestedSuccess, goodsRequestedFail } = actions;

export const readGoods = (e: React.BaseSyntheticEvent) => async (dispatch: AppDispatch) => {
    dispatch(goodsRequested());
    try {
        const file = e.target.files[0];
        const fileBuffer = await file.arrayBuffer();
        const wb = read(fileBuffer, { WTF: true });
        const dataBase = utils.sheet_to_json<FileDB>(wb.Sheets[wb.SheetNames[0]], { header: 'A' });
        if (dataBase) {
            const headersRow = dataBase.find((item) => Object.values(item).find((value) => value === 'Продукция'));
            if (!headersRow) throw new Error('Не подходящий документ');
            const headersWithLetters = headersRow && transformHeaders(headersRow);
            const goodsDB = dataBase.filter((item) => item !== headersRow);
            const transformGoodsDB = goodsDB && transformGoods(goodsDB, headersWithLetters);
            dispatch(goodsRequestedSuccess(transformGoodsDB));
        }
    } catch (error) {
        dispatch(goodsRequestedFail(error));
    }
};

export const getGoodsListStatus = () => (state) => state.goods.entities.length > 0;
export default goodsReducer;
