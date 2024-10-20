import { z } from 'zod';
import { type SheetData } from './readXLSXtable';
import { replaceObjectKeys } from './replaceObjectKeys';

interface ParseResult<T> {
  data: T[];
  parseError?: string;
}

interface ParseArgs<T> {
  data: SheetData[];
  startItem: string;
  headersMap: Record<string, keyof T>;
  schema: z.ZodSchema<T>;
}

export const parseSheetData = <T>({
  data,
  startItem,
  headersMap,
  schema,
}: ParseArgs<T>): ParseResult<T> => {
  const result: ParseResult<T> = { data: [], parseError: undefined };
  const firstTableRow = data.find(item => Object.values(item).find(item => item === startItem));
  if (!firstTableRow) {
    result.parseError = 'Таблица не найдена';
    return result;
  }

  const table = data.slice(data.indexOf(firstTableRow));
  const headers = table[0];
  const rows = table.slice(1);

  const itemFields = Object.typedKeys(headers).reduce(
    (acc: Record<keyof typeof headers, keyof T>, key) => {
      const value = headers[key];
      if (headersMap[value]) {
        acc[key] = headersMap[value];
      }
      return acc;
    },
    {},
  );

  rows.map(item => {
    const transformedRow = replaceObjectKeys(itemFields, item);
    const parsedRow = schema.safeParse(transformedRow);
    if (parsedRow.success) {
      result.data.push(parsedRow.data);
    }
  });

  return result;
};
