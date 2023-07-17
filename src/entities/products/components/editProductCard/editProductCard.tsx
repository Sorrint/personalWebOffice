import { useForm } from 'react-hook-form';
import { useEffect, type FC } from 'react';

import { EditProductProperty } from '@entities/products/components/editProductProperty/editProductProperty';
import type { IStoreProduct} from '@entities/products/model/types/IStoreProduct';
import { TextField } from '@shared/ui/textField';

import './editProductCard.scss';
import { ProductCollectionList } from '../productCollectionList/productCollectionList';
interface EditProductCardProps {
    product:  IStoreProduct
}

export const EditProductCard: FC<EditProductCardProps> = ({ product }) => {
    product.quantity = product.quantity ?? 1000;
    const { name} = product;
    const methods = useForm({
        defaultValues: product,
        mode: 'onChange'
    });

    const { watch, register } = methods;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
        return () => { subscription.unsubscribe(); };
    }, [watch]);

    const renderTextFieldProps = (fieldName: Parameters<typeof register>[0], textFieldType: 'number' | 'text') => {
        return  <TextField 
            {...register(fieldName, { valueAsNumber: textFieldType==='number'})}
            className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

    return (
        <>
            <div className="editCard">
                <h2 className='editCard__title'>{name}</h2>
                <div className='editCard__properties'>
                    <EditProductProperty propertyName='Наименование' renderEditField={() => renderTextFieldProps( 'name', 'text')}/>
                    <EditProductProperty propertyName='Единица товара' renderEditField={() => renderTextFieldProps('quantity', 'number')}/>
                    <EditProductProperty propertyName='Коллекция' renderEditField={() => <ProductCollectionList {...register('extraData.collection')}/>}/>
                </div>
            </div>
        </>
    );
};


