import { useSearchParams } from 'react-router-dom';

import { SaveOrderingToXLSX } from '@features/saveOrderingToXLSX';
import { CountPalletsForm } from '@features/countPalletsForm';
import { OrderingInfo, OrderingList, type Pallets, orderingReducer, orderingActions } from '@entities/orderings';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { useAppDispatch } from '@shared/lib/hooks';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import style from './createOrdering.module.scss'
import { Panel } from '@shared/ui/panel/panel';

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
            <div className={style.layout} >
                <div>Порядовка</div>
                <SaveOrderingToXLSX />
                <Panel title='Дополнительные параметры для расчета' open={false}>
                    <CountPalletsForm classname={style.form} onChange={setPallets}/>
                </Panel>
                <OrderingList/>
                <OrderingInfo />
            </div>
        </AsyncReduxComponent>
    );
};
