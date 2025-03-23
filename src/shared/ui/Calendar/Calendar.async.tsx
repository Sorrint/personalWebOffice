import { lazy } from 'react';
import { TypedCalendarComponent } from './Calendar';

export const CalendarAsync = lazy(() => import('./Calendar')) as TypedCalendarComponent;
