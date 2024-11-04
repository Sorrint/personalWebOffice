import { useParams } from 'react-router-dom';

import { CountPalletsForm } from '@features/countPalletsForm';
import { EditOrderingRows } from '@features/editOrdreringRows';
import {
  OrderingInfo,
  OrderingList,
  type Pallets,
  orderingReducer,
  orderingActions,
  useGetOrderingDetails,
} from '@entities/orderings';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { useAppDispatch } from '@shared/lib/hooks';
import { Panel } from '@shared/ui/panel/panel';

import style from './OrderingDetails.module.scss';
import { ScrollableBlock } from '../../../../shared/ui/ScrollableBlock';
import { FlexColumn } from '@shared/ui/Flex';

const reducers: ReducersList = {
  ordering: orderingReducer,
};

export const OrderingDetails = () => {
  // const [queryParams] = useSearchParams();
  const { orderNumber } = useParams();
  const dispatch = useAppDispatch();
  // useCreateOrderingData(orderId ?? '');
  const { data: orderingRecords } = useGetOrderingDetails(Number(orderNumber), {
    skip: !orderNumber,
  });

  console.log(orderingRecords);
  const setPallets = (palletsObj: Record<Pallets, number>) => {
    dispatch(orderingActions.setPalletsCount(palletsObj));
  };

  if (!orderNumber) return <>{'Нет id заказа'}</>;
  if (!orderingRecords) return null;

  return (
    <AsyncReduxComponent reducersList={reducers}>
      <FlexColumn gap='16'>
        <Panel title='Дополнительные параметры для расчета' open={true}>
          <CountPalletsForm onChange={setPallets} classname={style['pallets-form']} />
        </Panel>
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
