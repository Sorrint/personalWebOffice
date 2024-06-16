import { type IInventoryDocs } from '@entities/inventoryDocs';
import { pageSetup } from '../../consts/pageSetup';
import { tableColumns } from '../../consts/tableColumns';

export const saveInventoryToExcel = async (data: IInventoryDocs): Promise<void> => {
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Инвентаризация', pageSetup);

  sheet.columns = tableColumns;

  sheet.addRow({
    number: '№ п/п',
    name: 'Наименование товара',
    quantity: 'Кол-во',
    price: 'Цена',
    sum: 'Сумма',
    isInactive: 'Устар.',
  });

  data.products.map((item, index) => {
    sheet.addRow({
      number: index + 1,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      sum: (item.price ?? 0) * item.quantity,
      isInactive: item.isActiveAccount ? '' : '+',
    });
  });
  const buffer = await workbook.xlsx.writeBuffer();
  saveExcelFile(
    buffer,
    `Инвентаризация №${data.documentNumber} от ${String(data.choosenDate)
      .split('T')[0]
      .split('-')
      .reverse()
      .join('.')}`,
  );
};

async function saveExcelFile(arrayBuffer: ArrayBuffer, filename: string) {
  const { saveAs } = await import('file-saver');

  const blob = new Blob([new Uint8Array(arrayBuffer)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, `${filename}.xlsx`);
}
