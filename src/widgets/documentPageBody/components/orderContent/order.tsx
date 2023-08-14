import {useEffect} from 'react';
import { OrderCardWithControls } from '@features/orderCardWithControls';
import { useAppDispatch } from '@shared/lib/hooks';
import { useParams } from 'react-router-dom';
import { loadOrderById } from '@entities/orders';

export const Order = () => {
    const dispatch = useAppDispatch();
    const { _id} = useParams();
    console.log(_id);
    
    useEffect(()=> {
        _id && dispatch(loadOrderById(_id));
    }, [_id]);

    return (
        <>
            <div>
                <OrderCardWithControls/>
            </div>
        </>
    );
};

