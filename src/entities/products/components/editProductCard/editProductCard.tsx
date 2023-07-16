import { useForm } from 'react-hook-form';
import { useEffect, type FC } from 'react';

import { EditProductProperty } from '@entities/products/components/editProductProperty/editProductProperty';
import  { type IProductStock, type extraData } from '@entities/products/model/types/IStoreProduct';
import { TextField } from '@shared/ui/textField';

import './editProductCard.scss';
import { ProductCollectionList } from '../productCollectionList/productCollectionList';
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
    product.quantity = product.quantity ?? 1000;
    const { name} = product;
    const methods = useForm({
        mode: 'onChange'
    });

    const { watch, register } = methods;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
        return () => { subscription.unsubscribe(); };
    }, [watch]);

    const renderTextFieldProps = (fieldName: keyof IStoreProduct, textFieldType: 'number' | 'text') => {
        return  <TextField {...register(fieldName, {value: product[fieldName], valueAsNumber: textFieldType==='number'})} className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

    // const renderExtraDataProps = (fieldName: keyof extraData) => {
    //     const extraDataField = product.extraData?.[fieldName];
    //     setValue(`extraData.${fieldName}`, extraDataField);
    //     return <SelectListBox options={collectionOptions2} {...register('collection')} selected={collectionOptions2[0].value} setValue={setValue}/>;
    // };

    return (
        <>
            <div className="editCard">
                <h2 className='editCard__title'>{name}</h2>
                <div className='editCard__properties'>
                    <EditProductProperty propertyName='Наименование' renderEditField={() => renderTextFieldProps('name', 'text')}/>
                    <EditProductProperty propertyName='Единица товара' renderEditField={() => renderTextFieldProps('quantity', 'number')}/>
                    <EditProductProperty propertyName='Коллекция' renderEditField={() => <ProductCollectionList/>}/>
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