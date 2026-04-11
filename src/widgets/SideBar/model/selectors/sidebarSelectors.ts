import { type StoreSchema } from '@app/providers/storeProvider';

export const isCollapsedSidebar = (state: StoreSchema) => state.sideBar?.collapsed;
export const isHiddenSidebar = (state: StoreSchema) => state.sideBar?.visible;
