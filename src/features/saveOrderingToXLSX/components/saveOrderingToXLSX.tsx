import classNames from 'classnames';

// import {
// getOrderingChaptersData,
// getOrderingSummary,
// useGetOrderingRecords,
// } from '@entities/orderings';

// import { saveOrderingToExcel } from '../lib/helpers/';
import style from './saveOrderingToXLSX.module.scss';
// import { useParams } from 'react-router-dom';

interface SaveOrderingToXLSXProps {
  classname?: string;
}
export const SaveOrderingToXLSX = ({ classname }: SaveOrderingToXLSXProps) => {
  // const { orderNumber } = useParams();

  // const { data: orderingRecords } = useGetOrderingRecords(Number(orderNumber), {
  //   skip: !orderNumber,
  // });
  // const orderingData = useAppSelector(getOrderingChaptersData);
  // const summaryData = useAppSelector(getOrderingSummary);

  const saveToXLSX = () => {
    // if (orderingData && summaryData) {
    //   saveOrderingToExcel({ chaptersData: orderingData, summaryData }, 'Порядовка Demo');
    // }
  };

  return (
    <button className={classNames(style['create-xlsx'], classname)} onClick={saveToXLSX}>
      Скачать в XLSX
    </button>
  );
};
