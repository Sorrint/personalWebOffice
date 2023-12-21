import { memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '@shared/lib/hooks';

import { getCorrugatesSheetsText, 
    getGrossweightText, 
    getPalletsText, 
    getShipmentDayText, 
    getSleepsheetsText } from '../../lib/helpers';
import { getOrderingSummary, initSummary } from '../../model/slice/OrderingSlice';
import { type IOrderingSummaryData } from '../../model/types/ordering';
import styles from './orderingInfo.module.scss';
    interface OrderingInfoProps {
    className?: string
}

export const OrderingInfo = memo(({ className }: OrderingInfoProps) => {
    
    const orderingSummary = useAppSelector(getOrderingSummary)
    
    const [summary, setSummary] = useState<IOrderingSummaryData>(initSummary)

    useEffect(() => {
        if (orderingSummary ) {
            setSummary(orderingSummary)
        }
    }, [orderingSummary])

    return <div className={classNames(styles.summary, className)}>
        <p>{getPalletsText(summary.palletsCount)}</p>
        <p>{getSleepsheetsText(summary.slipSheetsCount ?? 0)}</p>
        <p>{getCorrugatesSheetsText(summary.corrugatedSheetsCount)}</p>
        <p>{getGrossweightText(summary.weights)}</p>
        <p>{getShipmentDayText(summary.shipmentDay)}</p>
    </div>;
});