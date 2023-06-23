import { transformProductName } from 'entities/products/lib/helpers/transformProductName';
import { IOrderProduct } from 'entities/products/model/interfaces/IOrderProduct';
import { IStoreProduct } from 'entities/products/model/interfaces/IStoreProduct';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import TextField from 'shared/ui/textField';

import './editOrderingProductCard.scss';

interface EditOrderingProductCardProps {
    product: IOrderProduct;
}

const EditOrderingProductCard: FC<EditOrderingProductCardProps> = ({ product }) => {
    const { count, number, productName: name, unit } = product;
    const productName = transformProductName(name);
    const { register, handleSubmit, setValue } = useForm({
        mode: 'onChange',
        defaultValues: {
            count,
            number,
            productName,
            unit
        }
    });

    return (
        <>
            <div className="ordering__productName">
                <TextField label="" {...register('productName')} inputClass="inline-input" />
            </div>
            <div className="ordering__item">
                <div className="ordering__cell item__number">
                    <TextField label="" {...register('number')} inputClass="inline-input" />
                </div>
                <div className="ordering__cell item__count">
                    <TextField label="" {...register('count')} inputClass="inline-input" type="number" />
                </div>
                <div className="ordering__cell item__unit">
                    <TextField label="" {...register('unit')} inputClass="inline-input" />
                </div>
            </div>
        </>
    );
};

export default EditOrderingProductCard;
