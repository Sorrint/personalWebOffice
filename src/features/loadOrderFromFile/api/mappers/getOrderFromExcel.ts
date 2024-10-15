import { IOrderRecord, IOrderRecords } from '@entities/orders';
import { transformProductName } from '../../lib/helpers/transformProductName/transformProductName';
import { parseSheetData } from '@shared/lib/utils/parseSheetData';
import { readXLSXTable } from '@shared/lib/utils/readXLSXtable';
import { replaceObjectKeys } from '@shared/lib/utils/replaceObjectKeys';

const headersOrderObject = {
  '№': 'number',
  'Товары (работы, услуги)': 'productName',
  'Кол-во': 'count',
  'Ед.': 'unit',
};

interface GetOrderResult {
  records: IOrderRecords;
  conflicts: IOrderRecord[];
}

export const getOrderFromExcel = async (
  e: React.BaseSyntheticEvent,
): Promise<GetOrderResult | null> => {
  const data = await readXLSXTable(e, 'TDSheet');
  if (typeof data === 'string') return null;
  const parsedData = parseSheetData(data, '№');
  if (typeof parsedData === 'string') return null;

  const result = parsedData.tableBody.reduce(
    (acc: GetOrderResult, item): GetOrderResult => {
      const record = replaceObjectKeys<typeof headersOrderObject, Record<string, unknown>>(
        headersOrderObject,
        item,
      );

      if (record.productName && record.number) {
        acc.records[record.number]
          ? acc.conflicts.push(record)
          : (acc.records[number] = { ...record, productName: transformProductName(productName) });
      }

      return acc;
    },
    { records: {}, conflicts: [] },
  );

  return result;
};
