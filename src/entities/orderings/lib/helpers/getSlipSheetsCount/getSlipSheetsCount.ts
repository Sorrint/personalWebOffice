export const getSlipSheetsCount = (rowsCount: number) => +(Math.ceil(rowsCount + 1) / 4).toFixed(2);
