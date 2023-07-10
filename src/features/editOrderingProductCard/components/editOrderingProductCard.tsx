import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, type FC } from 'react';

import { type IOrderProduct, transformProductName } from '@entities/products';
import { EditableContent } from '@shared/ui/editableContent';

import './editOrderingProductCard.scss';

interface EditOrderingProductCardProps {
    product: IOrderProduct
}

export const EditOrderingProductCard: FC<EditOrderingProductCardProps> = ({ product }) => {
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

    const { watch } = methods;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
        return () => { subscription.unsubscribe(); };
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
