import { useSearchParams } from 'react-router-dom';

import { OrderingList } from '@entities/orderings';

import styles from './createOrdering.module.scss';
import { useCreateOrderingData } from '@widgets/documentPageBody/hooks/useCreateOrderingData';

export const CreateOrdering = () => {

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    if (!orderId) return 'Нет id заказа';
    
    const {records, packages} = useCreateOrderingData(orderId);

    console.log(records);

    return (
        <>
            <div>Порядовка</div>
            <OrderingList orderingRecords={Object.values(records)} className={styles.content__body}/>
        </>
    );
};

