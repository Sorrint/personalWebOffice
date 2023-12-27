import classNames from 'classnames';

import { getOrderingData, getOrderingSummary } from '@entities/orderings';
import { useAppSelector } from '@shared/lib/hooks';

import { saveOrderingToExcel } from '../lib/helpers/';
import style from './saveOrderingToXLSX.module.scss';

interface SaveOrderingToXLSXProps {
    classname?: string
}
export const SaveOrderingToXLSX = ({classname}: SaveOrderingToXLSXProps) => {
    const orderingData = useAppSelector(getOrderingData)
    const summaryData = useAppSelector(getOrderingSummary)

    const saveToXLSX = () => {
        if (orderingData && summaryData) {
            saveOrderingToExcel({chaptersData: orderingData, summaryData}, 'Порядовка Demo')
        }
    };

    return  <button className={classNames(style['create-xlsx'], classname)} onClick={saveToXLSX}>Скачать в формате XLSX</button>;
};