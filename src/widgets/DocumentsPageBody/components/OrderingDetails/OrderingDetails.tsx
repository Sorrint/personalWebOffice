import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { CountPalletsForm } from '@features/CountPalletsForm';
import { EditOrderingRows } from '@features/EditOrderingRows';
import { OrderingInfo, OrderingProductsList, useGetOrderingRecords } from '@entities/Orderings';
import { Pallet, useGetOrderPackages, useUpdateOrderPackages } from '@entities/Orders';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';
import { Panel } from '@shared/ui/Panel';
import { FlexColumn } from '@shared/ui/Flex';
import style from './OrderingDetails.module.scss';

export const OrderingDetails = memo(() => {
  const { orderNumber } = useParams();

  const { data: orderingRecords } = useGetOrderingRecords(Number(orderNumber), {
    skip: !orderNumber,
  });
  const { data: pallets } = useGetOrderPackages(Number(orderNumber), {
    skip: !orderNumber,
  });

  const [updateOrderPackages] = useUpdateOrderPackages();

  const setPallets = (pallets: Pallet[]) => {
    updateOrderPackages({ orderNumber: Number(orderNumber), pallets });
  };

  if (!orderNumber) return <>{'Нет id заказа'}</>;
  if (!orderingRecords) return null;

  return (
    <FlexColumn gap='16'>
      {pallets && (
        <Panel title='Дополнительные параметры для расчета' open={true}>
          <CountPalletsForm
            onChange={setPallets}
            className={style['pallets-form']}
            orderNumber={orderNumber}
            pallets={pallets}
          />
        </Panel>
      )}
      <ScrollableBlock>
        <OrderingProductsList
          records={orderingRecords}
          editRows={(data: { category: string | null; rowsCount?: number }) => (
            <EditOrderingRows {...data} />
          )}
        />
      </ScrollableBlock>
      <OrderingInfo />
    </FlexColumn>
  );
});
