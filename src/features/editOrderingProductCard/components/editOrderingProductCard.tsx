import { useForm } from 'react-hook-form';
import { type FC } from 'react';

import { type IOrderProduct, transformProductName } from '@entities/products';
import { EditableContent } from '@shared/ui/editableContent';
import { TextField } from '@shared/ui/textField';

import './editOrderingProductCard.scss';

interface EditOrderingProductCardProps {
    product: IOrderProduct
}

export const EditOrderingProductCard: FC<EditOrderingProductCardProps> = ({ product }) => {
    const { count, number, productName: name, unit } = product;
    const productName = transformProductName(name);
    const { register } = useForm({
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
                <EditableContent/>
                {/* <TextField label="" {...register('productName')} inputClass="inline-input" /> */}
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
