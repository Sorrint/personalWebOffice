import classNames from 'classnames';

import { getOrderingData, getOrderingSummary } from '@entities/orderings';
import { useAppSelector } from '@shared/lib/hooks';

import { saveOrderingToXLSX, transformOrderingDataForXLSX } from '../lib/helpers';
import style from './saveOrderingToXLSX.module.scss';


interface SaveOrderingToXLSXProps {
    classname?: string
}
export const SaveOrderingToXLSX = ({classname}: SaveOrderingToXLSXProps) => {
    const orderingData = useAppSelector(getOrderingData)
    const summaryData = useAppSelector(getOrderingSummary)

    const saveToXLSX = () => {
        if (orderingData && summaryData) {
            const dataForXLSX = transformOrderingDataForXLSX({chaptersData: orderingData, summaryData});
            saveOrderingToXLSX(dataForXLSX, 'Порядовка.xlsx')
        }
    };

    return  <button className={classNames(style['create-xlsx'], classname)} onClick={saveToXLSX}>Скачать в формате XLSX</button>;
};