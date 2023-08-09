import { type StoreSchema } from '@app/providers/storeProvider/config/storeSchema';

export const getOrders = (state: StoreSchema) => state.orders?.entities;
