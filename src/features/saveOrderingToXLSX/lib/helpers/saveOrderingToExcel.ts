import { type Borders, type Worksheet } from 'exceljs';
import {
  type IOrderingChapter,
  type IOrderingSummary,
  getPalletsText,
  getCorrugatesSheetsText,
  getRowSeparatorText,
  getGrossweightText,
  getShipmentDayText,
  getCountInRowsText,
} from '@entities/orderings';
import { getDeclensions } from '@shared/lib/helpers';
import { headerRowBorder, rowCellsStyle } from '../../consts/tableBorders';
import { pageSetup } from '../../consts/pageSetup';
import { tableColumns } from '../../consts/tableColumns';

type IOrderingData = {
  chaptersData: IOrderingChapter[];
  summary: IOrderingSummary;
};

type HorizontalAlignments =
  | 'left'
  | 'center'
  | 'right'
  | 'fill'
  | 'justify'
  | 'centerContinuous'
  | 'distributed';

export const saveOrderingToExcel = async (data: IOrderingData, name: string): Promise<void> => {
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Порядовка', pageSetup);
  sheet.columns = tableColumns;

  addCustomerRow(
    sheet,
    'Заказчик',
    'ООО Прогресс-Строй, ИНН 987654321098, 123456, г. Маленький Город, ул. Солнечная, 210/5, оф. 210',
  );
  addCustomerRow(sheet, 'Грузоперевозчик', '');
  addEmptyRow(sheet, false);
  addHeaderRow(sheet);
  addProductRows(sheet, data.chaptersData);
  addSummary(sheet, data.summary);
  sheet.eachRow((row, rowNumber) => {
    const cell = row.getCell('name');
    if (cell && rowNumber > 2) {
      const textHeight = Math.ceil(cell.text.length / 73);
      const rowHeight = textHeight * 11.25;
      row.height = rowHeight;
    }
    if (rowNumber <= 2) {
      const customerCell = row.getCell('merged');
      const textHeight = Math.ceil(customerCell.text.length / 79);
      row.height = textHeight * 12.5;
    }
    if (rowNumber === 3) {
      row.height = 7;
    }
    if (rowNumber === 4) {
      row.height = 18;
    }
    if (!cell.value && rowNumber > 3) {
      const summaryCell = row.getCell('number');
      if (summaryCell.value) {
        row.height = 11.25;
      }
    }
  });
  const buffer = await workbook.xlsx.writeBuffer();
  saveExcelFile(buffer, name);
};

function addCustomerRow(sheet: Worksheet, text: 'Заказчик' | 'Грузоперевозчик', customer: string) {
  const customerRow = sheet.addRow({
    number: text + ':',
    merged: customer,
  });
  const firstTitleIdx = customerRow.getCell('number').address;
  const lastTitleIdx = customerRow.getCell('name').address;
  sheet.mergeCells(firstTitleIdx, lastTitleIdx);
  customerRow.font = { name: 'Arial', size: 9 };
  customerRow.alignment = { vertical: 'middle' };
  const customerCell = customerRow.getCell('merged');
  customerCell.font = { name: 'Arial', size: 9, bold: true };
  customerCell.alignment = { wrapText: true };
  const firstCustomerCell = customerRow.getCell('merged').address;
  const lastCustomerCell = customerRow.getCell('rows').address;
  sheet.mergeCells(firstCustomerCell, lastCustomerCell);
}

function addHeaderRow(sheet: Worksheet) {
  const headerRow = sheet.addRow({
    number: '№',
    name: 'Товары (работы, услуги)',
    count: 'Кол-во',
    unit: 'Ед.',
    rows: 'Ряды',
  });
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.font = { bold: true, size: 10, name: 'Arial' };
  headerRow.height = 15.75;
  const firstIdx = headerRow.getCell('name').address;
  const lastIdx = headerRow.getCell('merged').address;
  sheet.mergeCells(firstIdx, lastIdx);
  headerRow.eachCell(
    (cell, colNum) => (cell.border = { ...rowCellsStyle[colNum - 1], ...headerRowBorder }),
  );
  return;
}

function addSummary(
  sheet: Worksheet,
  { grossWeight, pallets, rowSeparator, corrugatedSheets }: IOrderingSummary,
) {
  const summaryRows = sheet.addRows([
    { number: getPalletsText(pallets) },
    { number: getCorrugatesSheetsText(corrugatedSheets) },
    { number: getRowSeparatorText(rowSeparator) },
    {},
    { number: getGrossweightText(grossWeight) },
    { number: getShipmentDayText() },
  ]);

  summaryRows.forEach(row => {
    row.alignment = { vertical: 'middle' };
  });
}

function addProductRows(sheet: Worksheet, data: IOrderingChapter[]) {
  const cellRowBorder: Partial<Borders> = { top: { style: 'thin' }, bottom: { style: 'thin' } };

  data.map(item => {
    item.records.map(record => {
      const horizontalAlignments: HorizontalAlignments[] = [
        'left',
        'center',
        'left',
        'left',
        'right',
        'left',
      ];
      const recordRow = sheet.addRow({
        number: record.number,
        name: record.productName,
        count: record.count,
        unit: record.unit,
        rows: '',
      });
      recordRow.eachCell((cell, colNum) => {
        cell.alignment = {
          horizontal: horizontalAlignments[colNum - 1],
          vertical: 'top',
          wrapText: true,
        };
        cell.border = { ...rowCellsStyle[colNum - 1], ...cellRowBorder };
      });
      const firstIdx = recordRow.getCell('name').address;
      const lastIdx = recordRow.getCell('merged').address;
      sheet.mergeCells(firstIdx, lastIdx);
    });

    const rowsCount = ~~(item.rowsCount || '');
    const countOfPackages = item.countOfPackages;
    const summaryRow = sheet.addRow({
      number: '',
      name: getCountInRowsText(item.text, item.countOfPackages),
      count: item.productsCount,
      unit: '',
      rows: countOfPackages
        ? `${rowsCount} ${getDeclensions(rowsCount, ['ряд', 'ряда', 'рядов'])} = ${
            rowsCount * countOfPackages
          }`
        : '',
    });
    summaryRow.height = 12.5;
    summaryRow.eachCell((cell, colNum) => {
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.font = { bold: true, name: 'Arial', size: 8 };
      cell.border = { ...rowCellsStyle[colNum - 1], ...cellRowBorder };
    });
    const firstIdx = summaryRow.getCell('name').address;
    const lastIdx = summaryRow.getCell('merged').address;
    sheet.mergeCells(firstIdx, lastIdx);
  });
  addEmptyRow(sheet, true);
}

function addEmptyRow(sheet: Worksheet, borderTop?: boolean) {
  const emptyRow = sheet.addRow({
    number: '',
    name: '',
    count: '',
    unit: '',
    rows: '',
  });
  if (borderTop) {
    emptyRow.eachCell(cell => {
      cell.border = { top: { style: 'medium' } };
    });
  }
  const firstIdx = emptyRow.getCell('name').address;
  const lastIdx = emptyRow.getCell('merged').address;
  sheet.mergeCells(firstIdx, lastIdx);
}

async function saveExcelFile(arrayBuffer: ArrayBuffer, filename: string) {
  const { saveAs } = await import('file-saver');

  const blob = new Blob([new Uint8Array(arrayBuffer)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, `${filename}.xlsx`);
}
