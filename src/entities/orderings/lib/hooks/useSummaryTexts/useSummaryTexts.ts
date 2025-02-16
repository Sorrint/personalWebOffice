import { useMemo } from 'react';
import { IOrderingSummary } from '../../../model/types/ordering';
import {
  getCorrugatesSheetsText,
  getGrossweightText,
  getPalletsText,
  getRowSeparatorText,
} from '../../helpers/getSummaryText';

export default (summary?: IOrderingSummary) =>
  useMemo(
    () => [
      summary?.pallets && getPalletsText(summary.pallets),
      summary?.rowSeparator && getRowSeparatorText(summary.rowSeparator),
      summary?.corrugatedSheets && getCorrugatesSheetsText(summary.corrugatedSheets),
      summary?.grossWeight && getGrossweightText(summary.grossWeight),
    ],
    [summary],
  );
