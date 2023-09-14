import { useAppDispatch } from '@shared/lib/hooks';
import { orderActions } from '@entities/orders';

import { getOrderFromExcel } from '../api/mappers/getOrderFromExcel';

export const LoadOrderFromFile = () => {
    const dispatch = useAppDispatch();
    const { setCurrentOrder } = orderActions;
    
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const order = await getOrderFromExcel(e);
        
        if (order) {
            const orderName = `Заказ №${1} от ${new Date().toLocaleDateString('ru-RU')}`;
            const newOrder = { orderName, orderRecords: [...order] };
            dispatch(setCurrentOrder(newOrder));
            if (localStorage.getItem('dataBase') === 'localStorage') localStorage.setItem('currentOrder', JSON.stringify(newOrder));
        }
    };

    return (
        <>
            <form>
                <input type="file" onChange={handleChange} />
            </form>
        </>
    );
};
