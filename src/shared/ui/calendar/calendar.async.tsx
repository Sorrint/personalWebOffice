import { lazy } from 'react';

export const CalendarAsync = lazy(async () => await import('./calendar'));