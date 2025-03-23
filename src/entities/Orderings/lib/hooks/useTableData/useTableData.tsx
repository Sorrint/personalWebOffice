import { getDeclensions } from '@shared/lib/helpers';
import { type IOrderingRecordDisplay, type IOrderingChapter } from '../../../model/types/ordering';
import { ChapterSummary } from '../../../components/OrderingProductsList/ChapterSummary/ChapterSummary';
import { getCountInRowsText } from '../../helpers/getOrderingTexts';
import { EditRows } from '../../../model/types/editRows';

type EditRowsArg = Parameters<typeof getSummaryRecord>[1];

const getSummaryRecord = (
  summary: Omit<IOrderingChapter, 'records'>,
  editRows?: EditRows,
): Partial<IOrderingRecordDisplay> => {
  const { productsCount, rowsCount, countOfPackages, text, packageCategory, id } = summary;
  const chapterText = getCountInRowsText(text, countOfPackages);

  const summaryRecord: Partial<IOrderingRecordDisplay> = {
    count: () => <ChapterSummary children={productsCount} />,
    productName: () => <ChapterSummary children={chapterText} />,
    rows: () => (
      <ChapterSummary>
        {countOfPackages && rowsCount
          ? `${rowsCount} ${getDeclensions(Number(rowsCount), ['ряд', 'ряда', 'рядов'])} = ${
              rowsCount * countOfPackages
            }`
          : ''}
        {editRows?.({ category: packageCategory || id, rowsCount })}
      </ChapterSummary>
    ),
  };
  return summaryRecord;
};

export interface UseTableDataProps {
  records?: IOrderingChapter[];
  editRows?: EditRowsArg;
}

const useTableData = ({ records, editRows }: UseTableDataProps) => {
  if (!records) {
    return null;
  }
  return records.reduce(
    (
      acc: Partial<IOrderingRecordDisplay>[],
      { records: products, ...summary }: IOrderingChapter,
    ) => {
      products.map(record => acc.push(record));
      acc.push(getSummaryRecord(summary, editRows));
      return acc;
    },
    [],
  );
};

export default useTableData;
