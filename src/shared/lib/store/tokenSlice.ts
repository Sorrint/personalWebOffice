import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { type TokenState } from './StoreTokenSchema';
export interface TokenState {
  authToken: string | null;
}

const initialState: TokenState = {
  authToken: null,
};

export const tokenSlice = createSlice({
  initialState,
  name: 'token',
  reducers: {
    clearToken: state => {
      state.authToken = null;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
    getToken: state => {
      state.authToken;
    },
  },
});

export const { reducer: tokenReducer } = tokenSlice;
export const { actions: tokenActions } = tokenSlice;
