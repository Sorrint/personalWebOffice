import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';

export const transformDate = (date: Date) => {
    const transformed = format(new Date(date), 'dd.MM.yyyy', { locale: ru });
    return transformed;
};
