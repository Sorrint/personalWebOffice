import { useSearchParams } from 'react-router-dom';

import { CountPalletsForm } from '@features/countPalletsForm';
import { OrderingInfo, OrderingList, type Pallets, orderingReducer, orderingActions } from '@entities/orderings';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import style from './createOrdering.module.scss'
import { useAppDispatch } from '@shared/lib/hooks';

const reducers: ReducersList = {
    ordering: orderingReducer
}

export const CreateOrdering = () => {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    const dispatch = useAppDispatch()

    if (!orderId) return 'Нет id заказа';
    useCreateOrderingData(orderId);

    const handleClick = () => {
        console.log('click')
    };

    const setPallets = (palletsObj: Record<Pallets, number>) => {
        dispatch(orderingActions.setPalletsCount(palletsObj))
        console.log(palletsObj)
    }

    return (
        <AsyncReduxComponent reducersList={reducers}>
            <div className={style.content__body}>Порядовка</div>
            <button className={style['create-xlsx']} onClick={handleClick}>Скачать в формате XLSX</button>
            <CountPalletsForm classname={style.content__body} onChange={setPallets}/>
            <OrderingList className={style.content__body}/>
            <OrderingInfo />
        </AsyncReduxComponent>
    );
};

// const xlsxName = 'Порядовка.xlsx';
// saveOrderingToXLSX<IOrderingDataForXLSX>(dataForXLSX, xlsxName);
//mock-данные 
// const palletsObj: Partial<Record<Pallets, number>> = {
//     pallets125:22,
//     pallets99: 14
// };

// const palletsWeight = (Object.keys(palletsObj) as Pallets[]).reduce((weight, pallet) =>
//     weight += PalletsWeight[pallet] * (palletsObj[pallet] ?? 0), 0);

// const corrugatedSheetsWeight = (palletsObj.pallets125 ? palletsObj.pallets125 * 1.5 * 2000 : 0) + (palletsObj.pallets99 ? palletsObj.pallets99 * 2 * 1500 : 0);
