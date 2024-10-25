import { type StoreSchema } from '@app/providers/storeProvider';

export const getOrderRecords = () => (state: StoreSchema) => state.orders?.records;
