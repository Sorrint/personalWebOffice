import { useAppDispatch } from '@shared/lib/hooks';

import { getOrderFromExcel } from '../api/mappers/getOrderFromExcel';
import { orderActions } from '@entities/orders';

export const LoadOrderFromFile = () => {
    const dispatch = useAppDispatch();
    const { setCurrentOrder } = orderActions;
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const order = await getOrderFromExcel(e);
        if (order) {
            const orderName = `Заказ №${1} от ${new Date().toLocaleDateString('ru-RU')}`;
            dispatch(setCurrentOrder({ orderName, products: [...order] }));
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
