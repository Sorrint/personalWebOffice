import { lazy } from 'react';

export const ProductsPageAsync = lazy(async () => await import('./productsPage'));
