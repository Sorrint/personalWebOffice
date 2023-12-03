import { type StoreSchema } from '@app/providers/storeProvider';

export const getOrders = (state: StoreSchema) => state.orders?.entities;
