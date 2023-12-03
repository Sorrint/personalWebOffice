import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
    collapsed?: boolean
    visible?: boolean
}

const SideBarState: SidebarState = {
    collapsed: false,
    visible: false
}

const SidebarSlice = createSlice({
    name: 'sidebar', 
    initialState: SideBarState,
    reducers: {
        changeCollapsed(state) {
            state.collapsed = !state.collapsed
        },
        changeVisible(state) {
            state.visible = !state.visible
        }
    }
}) 

export const { actions: sidebarActions } = SidebarSlice
export const { reducer: sidebarReducer } = SidebarSlice