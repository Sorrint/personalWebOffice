import { useSearchParams } from 'react-router-dom';

import { CountPalletsForm } from '@features/countPalletsForm';
import { OrderingInfo, OrderingList, type Pallets, orderingReducer, orderingActions } from '@entities/orderings';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { useAppDispatch } from '@shared/lib/hooks';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import style from './createOrdering.module.scss'
import { SaveOrderingToXLSX } from '@features/saveOrderingToXLSX';

const reducers: ReducersList = {
    ordering: orderingReducer
}

export const CreateOrdering = () => {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    const dispatch = useAppDispatch()

    if (!orderId) return 'Нет id заказа';
    useCreateOrderingData(orderId);

    const setPallets = (palletsObj: Record<Pallets, number>) => {
        dispatch(orderingActions.setPalletsCount(palletsObj))
    }

    return (
        <AsyncReduxComponent reducersList={reducers}>
            <div className={style.content__body}>Порядовка</div>
            <SaveOrderingToXLSX />
            <CountPalletsForm classname={style.content__body} onChange={setPallets}/>
            <OrderingList className={style.content__body}/>
            <OrderingInfo />
        </AsyncReduxComponent>
    );
};
