import { type PersistState } from '@shared/lib/store/types';

export const getOrders = () => (state: PersistState) => state.orders.entities;
