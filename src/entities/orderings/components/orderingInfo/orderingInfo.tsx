import { memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '@shared/lib/hooks';

import {
  getCorrugatesSheetsText,
  getGrossweightText,
  getPalletsText,
  getShipmentDayText,
  getSleepsheetsText,
} from '../../lib/helpers/getSummaryText';
import { getOrderingSummary, initSummary } from '../../model/slice/OrderingSlice';
import { type IOrderingSummaryData } from '../../model/types/ordering';
import styles from './orderingInfo.module.scss';
import { useGetOrderingPackageDetails } from '../../api/orderingsApi';
import { useParams } from 'react-router-dom';

interface OrderingInfoProps {
  className?: string;
}

export const OrderingInfo = memo(({ className }: OrderingInfoProps) => {
  const { orderNumber } = useParams();

  const orderingSummary = useAppSelector(getOrderingSummary);
  const { data, isLoading } = useGetOrderingPackageDetails(Number(orderNumber), {
    skip: !orderNumber,
  });

  const [summary, setSummary] = useState<IOrderingSummaryData>(initSummary);

  useEffect(() => {
    if (orderingSummary) {
      setSummary(orderingSummary);
    }
  }, [orderingSummary]);

  if (!summary || !data) {
    return null;
  }
  return (
    <div className={classNames(styles.summary, className)}>
      <p>{getPalletsText(data.palletsCount)}</p>
      <p>{getSleepsheetsText(summary.slipSheetsCount ?? 0)}</p>
      <p>{getCorrugatesSheetsText(summary.corrugatedSheetsCount)}</p>
      <p>{getGrossweightText(summary.weights)}</p>
      <p>{getShipmentDayText(summary.shipmentDay)}</p>
    </div>
  );
});

OrderingInfo.displayName = 'OrderingInfo';
