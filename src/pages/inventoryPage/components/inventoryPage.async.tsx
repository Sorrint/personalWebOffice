import { lazy } from 'react';

export const InventoryPageAsync = lazy(async () => await import('./inventoryPage'));
