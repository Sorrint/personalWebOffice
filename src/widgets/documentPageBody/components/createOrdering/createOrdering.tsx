import { useSearchParams } from 'react-router-dom';

import { OrderingInfo, OrderingList } from '@entities/orderings';

import { useCreateOrderingData } from '../../hooks/useCreateOrderingData';
import styles from './createOrdering.module.scss';


export const CreateOrdering = () => {
    const sectionOrder = {
        1: '64c8fa0f3812ac8d1ea9cc59',
        2: '64c8f9db3812ac8d1ea9cc55',
        3: '64c8f93e3812ac8d1ea9cc4f',
        4: '64c8f9653812ac8d1ea9cc51',
        5: '64c8f8e13812ac8d1ea9cc4b',
        6: '64c8e78d3812ac8d1ea9c194',
        7: '64c8e76e3812ac8d1ea9c191'
    };

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    if (!orderId) return 'Нет id заказа';
    
    const {records, packages } = useCreateOrderingData(orderId);

    const sortedRecords = Object.keys(records).length>0 ? Object.values(sectionOrder).map(item => records?.[item]).filter(item => item) : undefined;
    
    return (
        <>
            <div>Порядовка</div>
            {sortedRecords && <OrderingList orderingRecords={Object.values(sortedRecords)} className={styles.content__body}/>}
            <OrderingInfo 
                orderingInfo={{
                    grossWeight: 3200, 
                    palletsCount: { pallets125: 9, pallets: 2 },
                    slipSheetsCount: 4,
                    corrugatedSheetsCount: { "T21": 3, "T99/2": 2 },
                    shipmentDay: new Date()
                }}/>
        </>
    );
};

