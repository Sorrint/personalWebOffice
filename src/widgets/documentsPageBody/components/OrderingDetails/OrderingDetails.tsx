import { useParams } from 'react-router-dom';

import { CountPalletsForm } from '@features/countPalletsForm';
import { EditOrderingRows } from '@features/editOrdreringRows';
import {
  OrderingInfo,
  OrderingList,
  orderingReducer,
  useGetOrderingRecords,
} from '@entities/orderings';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { Panel } from '@shared/ui/panel/panel';

import style from './OrderingDetails.module.scss';
import { ScrollableBlock } from '../../../../shared/ui/ScrollableBlock';
import { FlexColumn } from '@shared/ui/Flex';
import { Pallet, useGetOrderPackages, useUpdateOrderPackages } from '@entities/orders';

const reducers: ReducersList = {
  ordering: orderingReducer,
};

export const OrderingDetails = () => {
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
    <AsyncReduxComponent reducersList={reducers}>
      <FlexColumn gap='16'>
        {pallets && (
          <Panel title='Дополнительные параметры для расчета' open={true}>
            (
            <CountPalletsForm
              onChange={setPallets}
              classname={style['pallets-form']}
              orderNumber={orderNumber}
              pallets={pallets}
            />
            )
          </Panel>
        )}
        <ScrollableBlock>
          <OrderingList
            records={orderingRecords}
            editRows={(key: string | null) => <EditOrderingRows chapterKey={key} />}
          />
        </ScrollableBlock>
        <OrderingInfo />
      </FlexColumn>
    </AsyncReduxComponent>
  );
};
