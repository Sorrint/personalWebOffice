import { format, ru } from './useDateFNS'


export const transformDate = (date: Date) => {
    
    const transformed = format(new Date(date), 'dd.MM.yyyy', { locale: ru });

    return transformed;
};


