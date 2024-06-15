import { useSearchParams } from 'react-router-dom';

import { CountPalletsForm } from '@features/countPalletsForm';
import { EditOrderingRows } from '@features/editOrdreringRows';
import {
  OrderingInfo,
  OrderingList,
  type Pallets,
  orderingReducer,
  orderingActions,
} from '@entities/orderings';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { useAppDispatch } from '@shared/lib/hooks';
import { Panel } from '@shared/ui/panel/panel';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import style from './createOrdering.module.scss';
import { ScrollableBlock } from '../../../../shared/ui/ScrollableBlock';

const reducers: ReducersList = {
  ordering: orderingReducer,
};

export const CreateOrdering = () => {
  const [queryParams] = useSearchParams();
  const orderId = queryParams.get('orderId');
  const dispatch = useAppDispatch();

  useCreateOrderingData(orderId ?? '');

  const setPallets = (palletsObj: Record<Pallets, number>) => {
    dispatch(orderingActions.setPalletsCount(palletsObj));
  };

  if (!orderId) return <>{'Нет id заказа'}</>;

  return (
    <AsyncReduxComponent reducersList={reducers}>
      <Panel title='Дополнительные параметры для расчета' open={false}>
        <CountPalletsForm classname={style.form} onChange={setPallets} />
      </Panel>
      <ScrollableBlock>
        <OrderingList editRows={(key: string) => <EditOrderingRows chapterKey={key} />} />
      </ScrollableBlock>
      <OrderingInfo />
    </AsyncReduxComponent>
  );
};
