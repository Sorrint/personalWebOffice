import { lazy } from 'react';

export const DocumentsPageAsync = lazy(async () => await import('./documentsPage'));
