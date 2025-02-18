import { type ReactNode } from 'react';
import { getDeclensions } from '@shared/lib/helpers';
import { type IOrderingRecordDisplay, type IOrderingChapter } from '../../../model/types/ordering';
import { ChapterSummary } from '../../../components/orderingList/chapterSummary/chapterSummary';
import { getCountInRowsText } from '../../helpers/getOrderingTexts';

const getSummaryRecord = (
  summary: Omit<IOrderingChapter, 'records' | 'packageCategory'>,
  editRowsFunc?: () => ReactNode,
): Partial<IOrderingRecordDisplay> => {
  const { productsCount, rowsCount, countOfPackages, text } = summary;
  const chapterText = getCountInRowsText(text, countOfPackages);

  const summaryRecord: Partial<IOrderingRecordDisplay> = {
    count: () => <ChapterSummary value={productsCount} />,
    productName: () => <ChapterSummary value={chapterText} />,
    rows: () => (
      <ChapterSummary
        value={
          countOfPackages && rowsCount
            ? `${rowsCount} ${getDeclensions(Number(rowsCount), ['ряд', 'ряда', 'рядов'])} = ${
                rowsCount * countOfPackages
              }`
            : ''
        }
        editRows={editRowsFunc}
        variant='edit-rows'
      />
    ),
  };
  return summaryRecord;
};

interface UseTableDataProps {
  records?: IOrderingChapter[];
  editRows?: (key: string) => ReactNode;
}

const useTableData = ({ records, editRows }: UseTableDataProps) => {
  if (!records) {
    return null;
  }
  return records.reduce(
    (
      acc: Partial<IOrderingRecordDisplay>[],
      { records: products, packageCategory, ...summary }: IOrderingChapter,
    ) => {
      products.map(record => acc.push(record));
      const editRowsFunc = () => editRows?.(packageCategory || summary.id);
      const summaryRecord = getSummaryRecord(summary, editRowsFunc);
      acc.push(summaryRecord);
      return acc;
    },
    [],
  );
};

export default useTableData;
