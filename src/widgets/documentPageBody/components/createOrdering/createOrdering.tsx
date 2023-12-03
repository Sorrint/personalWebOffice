import { useSearchParams } from 'react-router-dom';

import { useGetOrderProductsWeight } from '@features/getOrderProductsWeight';
import { OrderingInfo, OrderingList, SLIPSHEETWEIGHT, type Pallets, PalletsWeight } from '@entities/orderings';
import { isEmptyObject } from '@shared/lib/helpers';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import { getOrderingRowsCount } from '../../libs/helpers/createOrdering';
import styles from './createOrdering.module.scss';

export const CreateOrdering = () => {
    //mock-данные 
    const palletsObj: Partial<Record<Pallets, number>> = {
        pallets125:22,
        pallets99: 14
    };

    const palletsWeight = (Object.keys(palletsObj) as Pallets[]).reduce((weight, pallet) =>
        weight += PalletsWeight[pallet] * (palletsObj[pallet] ?? 0), 0);

    const corrugatedSheetsWeight = (palletsObj.pallets125 ? palletsObj.pallets125 * 1.5 * 2000 : 0) + (palletsObj.pallets99 ? palletsObj.pallets99 * 2 * 1500 : 0);


    //порядок id категорий
    const sectionOrder = {
        6: '652016c4b3e554be97d46267',
        1: '64daa7c326529ad019afc7d0',
        2: '64daa7a926529ad019afc7cc',
        3: '64daa79626529ad019afc7c8',
        4: '64daa78b26529ad019afc7c6',
        5: '64daa76f26529ad019afc7c2',
        7: '64daa76326529ad019afc7c0',
        8: '64daa6fd26529ad019afc7be',
        9: '6521251cec860329e66ef6a8',
        10: '652131a4177b2cc6d7f2b44c'
    };

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    if (!orderId) return 'Нет id заказа';

    const { records } = useCreateOrderingData(orderId);
    const { allWeight } = useGetOrderProductsWeight(orderId);
    const orderingRows = getOrderingRowsCount(records) ;
    const { rowsCount } = orderingRows;
    const slipSheetsCount = orderingRows ? Number((Math.ceil(rowsCount+1)/4).toFixed(2)) : 0;
    const sortedRecords = !isEmptyObject(sectionOrder) && Object.values(sectionOrder).map(item => records?.[item]).filter(item => item);

    return (
        <>
            <div>Порядовка</div>
            {sortedRecords && <OrderingList orderingRecords={Object.values(sortedRecords)} className={styles.content__body} />}
            <OrderingInfo
                orderingInfo={{
                    grossWeight: ((allWeight + palletsWeight + corrugatedSheetsWeight + slipSheetsCount* SLIPSHEETWEIGHT) / 1000),
                    palletsCount: palletsObj,
                    slipSheetsCount: Math.ceil(slipSheetsCount),
                    corrugatedSheetsCount: {
                        T21: (palletsObj.pallets125 && palletsObj.pallets125 * 1.5),
                        T99_2: palletsObj.pallets99 && palletsObj.pallets99 * 2
                    },
                    shipmentDay: new Date()
                }} />
        </>
    );
};

