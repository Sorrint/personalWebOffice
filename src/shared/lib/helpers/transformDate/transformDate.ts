import { useAsyncLoad } from '../../hooks';

export const transformDate = (date: Date) => {
    const ru = useAsyncLoad('date-fns/locale/ru')
    const format  = useAsyncLoad('date-fns/format')

    if (format && ru) {
        const transformed = format.default(new Date(date), 'dd.MM.yyyy', { locale: ru.default });
    
        return transformed;
    }
};


