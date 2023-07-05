import { addOrder, setCurrentOrder } from '@entities/orders/model/OrderSlice';
import { useAppDispatch } from '@shared/lib/hooks';
import { getOrderFromExcel } from '../api/mappers/getOrderFromExcel';

const LoadOrderFromFile = () => {
    const dispatch = useAppDispatch();

    const handleChange = async (e: React.BaseSyntheticEvent) => {
        const order = await getOrderFromExcel(e);
        if (order) {
            const orderName = `Заказ №${1} от ${new Date().toLocaleDateString('ru-RU')}`;
            dispatch(setCurrentOrder({ orderName, products: [...order] }));
        }
    };

    return (
        <>
            <form>
                <input type="file" onChange={(e) => handleChange(e)} />
            </form>
        </>
    );
};

export default LoadOrderFromFile;
