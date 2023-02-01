import { GoodsSlice } from './GoodsSlice';
import { AppDispatch } from './../goodsStore';
import { read, utils } from 'xlsx';
import { transformGoods, transformHeaders } from '../../api/mappedFromFile';
import { FileDB } from '../IGoods';

export const readGoods = (e: React.BaseSyntheticEvent) => async (dispatch: AppDispatch) => {
    dispatch(GoodsSlice.actions.goodsRequested());
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
            dispatch(GoodsSlice.actions.goodsRequestedSuccess(transformGoodsDB));
        }
    } catch (error) {
        dispatch(GoodsSlice.actions.goodsRequestedFail(error));
    }
};
