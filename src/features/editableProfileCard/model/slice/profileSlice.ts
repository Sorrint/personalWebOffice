// import { type IOrder } from './interfaces/IOrder';
import { type Profile } from '@entities/profile';
import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
    entities?: Profile
    readonly?: boolean
    isLoading: boolean
    error?: string
}

const initialState: ProfileState = {
    entities: undefined,
    readonly: true,
    isLoading: true,
    error: ''
};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileRequested: (state) => {
            state.isLoading = true;
        },
        profileRequestedSuccess: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.entities = action.payload;
        },
        profileRequestedFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { actions: ProfileActions } = ProfileSlice;
export const { reducer: ProfileReducer } = ProfileSlice;
