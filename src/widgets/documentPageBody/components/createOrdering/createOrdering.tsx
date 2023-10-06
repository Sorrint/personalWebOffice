import { useSearchParams } from 'react-router-dom';

import { useGetOrderProductsWeight } from '@features/getOrderProductsWeight';
import { OrderingInfo, OrderingList } from '@entities/orderings';
import { isEmptyObject } from '@shared/lib/helpers';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import styles from './createOrdering.module.scss';

export const CreateOrdering = () => {
    const sectionOrder = {
        1: '64daa7c326529ad019afc7d0',
        2: '64daa7a926529ad019afc7cc',
        3: '64daa78b26529ad019afc7c6',
        4: '64daa79626529ad019afc7c8',
        5: '64daa76f26529ad019afc7c2',
        6: '64daa76326529ad019afc7c0',
        7: '64daa6fd26529ad019afc7be'
    };

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    if (!orderId) return 'Нет id заказа';
    
    const { records } = useCreateOrderingData(orderId);
    const { productsWeight }= useGetOrderProductsWeight(orderId);
    const sortedRecords = !isEmptyObject(sectionOrder) && Object.values(sectionOrder).map(item => records?.[item]).filter(item => item);
    
    return (
        <>
            <div>Порядовка</div>
            {sortedRecords && <OrderingList orderingRecords={Object.values(sortedRecords)} className={styles.content__body}/>}
            <OrderingInfo 
                orderingInfo={{
                    grossWeight: Math.floor(productsWeight/1000), 
                    palletsCount: { pallets125: 9, pallets: 21},
                    slipSheetsCount: 4,
                    corrugatedSheetsCount: { T21: 3, T99_2:3 },
                    shipmentDay: new Date()
                }}/>
        </>
    );
};

