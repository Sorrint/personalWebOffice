import { useMemo } from 'react';
import { type OrderingSummary } from '../../../model/types/ordering';
import {
  getCorrugatesSheetsText,
  getGrossweightText,
  getPalletsText,
  getRowSeparatorText,
} from '../../helpers/getOrderingTexts';

export default (summary?: OrderingSummary) =>
  useMemo(
    () => [
      summary?.pallets && getPalletsText(summary.pallets),
      summary?.rowSeparator && getRowSeparatorText(summary.rowSeparator),
      summary?.corrugatedSheets && getCorrugatesSheetsText(summary.corrugatedSheets),
      summary?.grossWeight && getGrossweightText(summary.grossWeight),
    ],
    [summary],
  );
