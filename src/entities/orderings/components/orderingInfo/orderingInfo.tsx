import { memo } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useGetOrderingSummary } from '../../api/orderingsApi';
import useSummaryTexts from '../../lib/hooks/useSummaryTexts/useSummaryTexts';
import styles from './orderingInfo.module.scss';

interface OrderingInfoProps {
  className?: string;
}

export const OrderingInfo = memo(({ className }: OrderingInfoProps) => {
  const { orderNumber } = useParams();

  const { data: summary } = useGetOrderingSummary(Number(orderNumber), { skip: !orderNumber });

  const summaryTexts = useSummaryTexts(summary);

  if (!summary || !summaryTexts?.length) {
    return null;
  }
  return (
    <div className={classNames(styles.summary, className)}>
      {summaryTexts.map(text => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
});

OrderingInfo.displayName = 'OrderingInfo';
