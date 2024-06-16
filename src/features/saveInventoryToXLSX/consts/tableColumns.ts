import { type Column, type Font } from 'exceljs';

const font: Partial<Font> = { name: 'Calibri', size: 12 };

export const tableColumns: Partial<Column>[] = [
  {
    key: 'number',
    style: { font, alignment: { horizontal: 'center' } },
    width: 9,
  },
  {
    key: 'name',
    style: { font },
    width: 100,
  },
  {
    key: 'quantity',
    style: { font, alignment: { horizontal: 'center' } },
    width: 11,
  },
  {
    key: 'price',
    style: { font, alignment: { horizontal: 'center' } },
    width: 11,
  },
  {
    key: 'sum',
    style: { font, alignment: { horizontal: 'center' } },
    width: 11,
  },
  {
    key: 'isInactive',
    style: { font, alignment: { horizontal: 'center' } },
    width: 11,
  },
];
