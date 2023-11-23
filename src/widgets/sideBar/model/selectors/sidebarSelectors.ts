import { type StoreSchema } from '@app/providers/storeProvider';

export const isCollapsedSidebar = (state: StoreSchema) => state.sidebar?.collapsed;
export const isHiddenSidebar = (state: StoreSchema) => state.sidebar?.visible;
