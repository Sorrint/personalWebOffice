import { type StoreSchema } from '@app/providers/storeProvider';

export const getCurrentOrder = () => (state: StoreSchema) => state.orders?.currentOrder ?? undefined;
