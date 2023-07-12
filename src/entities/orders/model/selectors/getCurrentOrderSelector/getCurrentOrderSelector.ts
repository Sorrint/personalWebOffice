import { type StoreSchema } from '@app/providers/storeProvider/config/storeSchema';

export const getCurrentOrder = () => (state: StoreSchema) => state.orders?.currentOrder ?? undefined;
