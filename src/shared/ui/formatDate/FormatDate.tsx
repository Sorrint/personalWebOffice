import { useAsyncLoad } from '@shared/lib/hooks';

interface FormatDateProps {
  date?: Date;
}
export const FormatDate = ({ date }: FormatDateProps) => {
  const ru = useAsyncLoad('date-fns/locale/ru');
  const format = useAsyncLoad('date-fns/format');
  if (!date) {
    return null;
  }
  if (format && ru) {
    const transformed = format.formatDate(new Date(date), 'dd.MM.yyyy', { locale: ru.ru });
    return <>{transformed}</>;
  }
};
