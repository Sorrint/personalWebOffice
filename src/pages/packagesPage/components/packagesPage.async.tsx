import { lazy } from 'react';

export const PackagesPageAsync = lazy(async () => await import('./packagesPage'));
