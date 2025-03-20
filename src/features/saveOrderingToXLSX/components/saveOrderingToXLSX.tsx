import classNames from 'classnames';

// import {
// getOrderingChaptersData,
// getOrderingSummary,
// useGetOrderingRecords,
// } from '@entities/orderings';

import { saveOrderingToExcel } from '../lib/helpers/saveOrderingToExcel';
import style from './saveOrderingToXLSX.module.scss';
import { useParams } from 'react-router-dom';
import { useGetOrderingRecords, useGetOrderingSummary } from '@entities/orderings';

interface SaveOrderingToXLSXProps {
  className?: string;
}
export const SaveOrderingToXLSX = ({ className }: SaveOrderingToXLSXProps) => {
  const { orderNumber } = useParams();

  const { data: orderingRecords } = useGetOrderingRecords(Number(orderNumber), {
    skip: !orderNumber,
  });

  const { data: summary } = useGetOrderingSummary(Number(orderNumber), { skip: !orderNumber });

  const saveToXLSX = () => {
    if (orderingRecords && summary) {
      saveOrderingToExcel({ chaptersData: orderingRecords, summary }, 'Порядовка Demo');
    }
  };

  return (
    <button className={classNames(style['create-xlsx'], className)} onClick={saveToXLSX}>
      Скачать в XLSX
    </button>
  );
};
