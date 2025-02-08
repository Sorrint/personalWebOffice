import { lazy } from 'react';
import { TypedCalendarComponent } from './calendar';

export const CalendarAsync = lazy(() => import('./calendar')) as TypedCalendarComponent;
