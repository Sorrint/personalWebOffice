import { createAction, createSlice } from '@reduxjs/toolkit';
import { IStoreProduct } from './interfaces/IStoreProduct';
import { AppDispatch, PersistState } from '@shared/lib/store/types';
import { createProductDto } from './DTO/createProductDTO';
import { transformProductName } from '../lib/helpers/transformProductName';

interface ProductsState {
    entities: IStoreProduct[];
    isLoading: boolean;
    error: string;
}

const initialState: ProductsState = {
    entities: [],
    isLoading: true,
    error: ''
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        createProduct: (state, action) => {
            state.entities.push(action.payload);
        },
        updateProduct: (state, action) => {}
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { createProduct, updateProduct } = actions;
// export const createProduct = (product: ) =>
const createProductRequested = createAction('products/createProductRequested');
const createProductFailed = createAction('products/createProductFailed');

export const getProducts = () => (state: PersistState) => state.products.entities;

export const getProductByName = (name: string) => (state: PersistState) =>
    state.products.entities.find((item) => item.name === name);

export const addProduct =
    (payload: createProductDto) => async (dispatch: AppDispatch, getState: () => PersistState) => {
        dispatch(createProductRequested());
        try {
            const name = transformProductName(payload.name);
            const state = getState();
            const isNameUnique = !state.products.entities.some(
                (product) => product.name.toLowerCase() === name.toLowerCase()
            );
            if (isNameUnique) {
                dispatch(createProduct({ ...payload, name }));
            } else {
                throw new Error('Такой товар уже есть в базе');
            }
        } catch (error) {
            dispatch(createProductFailed());
        }
    };
// export const readproducts = (e: React.BaseSyntheticEvent) => async (dispatch: AppDispatch) => {
//     dispatch(productsRequested());
//     try {
//         const file = e.target.files[0];
//         const fileBuffer = await file.arrayBuffer();
//         const wb = read(fileBuffer, { WTF: true });
//         const dataBase = utils.sheet_to_json<FileDB>(wb.Sheets[wb.SheetNames[0]], { header: 'A' });
//         if (dataBase) {
//             const headersRow = dataBase.find((item) => Object.values(item).find((value) => value === 'Продукция'));
//             if (!headersRow) throw new Error('Не подходящий документ');
//             const headersWithLetters = headersRow && transformHeaders(headersRow);
//             const productsDB = dataBase.filter((item) => item !== headersRow);
//             const transformproductsDB = productsDB && transformproducts(productsDB, headersWithLetters);
//             dispatch(productsRequestedSuccess(transformproductsDB));
//         }
//     } catch (error) {
//         dispatch(productsRequestedFail(error));
//     }
// };

export const findProductByName = (name: string) => (state: PersistState) =>
    state.products.entities.find((product) => product.name.toLowerCase() === transformProductName(name).toLowerCase());
// export const getproductsListStatus = () => (state) => state.products.entities.length > 0;
export default productsReducer;
