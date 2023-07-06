import { transformProductName } from '@entities/products/lib/helpers/transformProductName';
import { IOrderProduct } from '@entities/products/model/interfaces/IOrderProduct';
import { FC, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TextField from '@shared/ui/textField';

import './editOrderingProductCard.scss';
import { EditableContent } from '@shared/ui/editableContent/editableContent';

interface EditOrderingProductCardProps {
    product: IOrderProduct;
}

const EditOrderingProductCard: FC<EditOrderingProductCardProps> = ({ product }) => {
    const { count, number, productName: name, unit } = product;
    const productName = transformProductName(name);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            count,
            number,
            productName,
            unit
        }
    });

    const {watch, register} = methods

    useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
      }, [watch]);

    return (
        <>
        <FormProvider {...methods} >
            <div className="editCard__productName">
                <EditableContent name='productName'/>
            </div>
            <div className="editCard__item">
                <div className="editCard__cell item__number">
                <EditableContent name='number'/>
            </div>
                <div className="editCard__cell item__count">
                <EditableContent name='count'/>
                </div>
                <div className="editCard__cell item__unit">
                <EditableContent name='unit'/>
                </div>
            </div>
            </FormProvider>
        </>
    );
};

export default EditOrderingProductCard;
