import { type ReactNode } from 'react';
import { getDeclensions } from '@shared/lib/helpers';
import { type IOrderingRecordDisplay, type IOrderingChapter } from '../../../model/types/ordering';
import { ChapterSummary } from '../../../components/orderingList/chapterSummary/chapterSummary';

type Summary = IOrderingChapter['summary'];

const transformSummary = (
  summary: Summary,
  editRowsFunc?: () => ReactNode,
): Partial<IOrderingRecordDisplay> => {
  const { totalCount, text, rowsCount, countOfPackages } = summary;

  const displayCountRows = Math.round(rowsCount);
  const summaryRecord: Partial<IOrderingRecordDisplay> = {
    count: () => <ChapterSummary value={totalCount} />,
    productName: () => <ChapterSummary value={text ? text : `В ряду ${countOfPackages} шт.`} />,
    rows: () => (
      <ChapterSummary
        value={
          countOfPackages
            ? `${displayCountRows} ${getDeclensions(displayCountRows, ['ряд', 'ряда', 'рядов'])} = ${
                displayCountRows * countOfPackages
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
  records?: Record<string, IOrderingChapter>;
  editRows?: (key: string) => ReactNode;
}

const useTableData = ({ records, editRows }: UseTableDataProps) => {
  if (!records) {
    return null;
  }
  return Object.keys(records).reduce((acc: Partial<IOrderingRecordDisplay>[], key: string) => {
    records[key].records.map(record => acc.push(record));
    const editRowsFunc = () => editRows?.(key);
    const summaryRecord = transformSummary(records[key].summary, editRowsFunc);
    acc.push(summaryRecord);
    return acc;
  }, []);
};

export default useTableData;
