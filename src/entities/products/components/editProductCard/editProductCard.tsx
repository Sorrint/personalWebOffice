import { useForm } from 'react-hook-form';
import { useEffect, type FC } from 'react';

import { EditProductProperty } from '@entities/products/components/editProductProperty/editProductProperty';
import  { type IProductStock, type extraData } from '@entities/products/model/types/IStoreProduct';
import { TextField } from '@shared/ui/textField';

import './editProductCard.scss';
export interface IStoreProduct {
    _id?: string
    name: string
    type: string
    quantity?: number
    department?: {
        id: number
        name: string
        tax: string
    }
    isMarked?: null | boolean
    price?: null | number
    stock?: null | IProductStock[]
    tax?: string
    unit?: string
    extraData?: extraData
}


interface EditProductCardProps {
    product:  IStoreProduct
}

export const EditProductCard: FC<EditProductCardProps> = ({ product }) => {
    product.extraData = product.extraData ??  {collection: '5 кг', volume: 5.7, weight: 5};
    
    const { name} = product;
    const methods = useForm({
        mode: 'onChange'
    });

    const { watch, register, setValue } = methods;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
        return () => { subscription.unsubscribe(); };
    }, [watch]);

    const renderTextFieldProps = (fieldName: keyof IStoreProduct) => {
        const textFieldType = typeof product[fieldName] === 'number' ? 'number' : 'text';
        setValue(fieldName, product[fieldName]);
        return  <TextField {...register(fieldName) } className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

    const renderExtraDataProps = (fieldName: keyof extraData) => {
        const extraDataField = product.extraData?.[fieldName];
        const textFieldType = typeof extraDataField === 'number' ? 'number' : 'text';
        setValue(`extraData.${fieldName}`, extraDataField);
        return <TextField {...register(`extraData.${fieldName}`) } className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

    return (
        <>
            <div className="editCard">
                <h2 className='editCard__title'>{name}</h2>
                <div className='editCard__properties'>
                    <EditProductProperty propertyName='Наименование' renderEditField={() => renderTextFieldProps('name')}/>


                </div>
            </div>
        </>
    );
};



{/* <EditProductProperty propertyName='Единица измерения' renderEditField={() => renderTextFieldProps('type')}/>
                    <EditProductProperty propertyName='Объем' renderEditField={() => renderExtraDataProps('collection')}/>
                    <EditProductProperty propertyName='Вес' renderEditField={() => renderExtraDataProps('volume')}/>  */}
{/* <SelectComboBox {...register('weight')}/> */}
{/* <EditProductProperty propertyName='Ед.' renderEditField={() => renderFieldProps('unit')}/> */}
{/* {extraData?.collection && <EditProductProperty propertyName='Ед.' renderEditField={() => renderFieldProps('collection')}/>} */}