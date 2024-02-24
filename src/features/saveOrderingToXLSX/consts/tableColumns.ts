import { type Font } from 'exceljs';

const font: Partial<Font> = { name: 'Arial', size: 8 };

export const tableColumns = [
  { key: 'empty', style: { font }, width: 1 },
  { key: 'number', style: { font }, width: 4.8 },
  { key: 'name', style: { font }, width: 11 },
  { key: 'merged', style: { font }, width: 52 },
  { key: 'count', style: { font }, width: 7 },
  { key: 'unit', style: { font }, width: 4.7 },
  { key: 'rows', style: { font }, width: 13 },
];
