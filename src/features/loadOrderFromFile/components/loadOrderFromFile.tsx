import { useAppDispatch } from '@shared/lib/hooks';
import { setCurrentOrder } from '@entities/orders';

import { getOrderFromExcel } from '../api/mappers/getOrderFromExcel';

export const LoadOrderFromFile = () => {
    const dispatch = useAppDispatch();

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
