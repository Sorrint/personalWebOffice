import type { Path, PathValue} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useEffect, type FC } from 'react';

import { EditProductProperty } from '@entities/products/components/editProductProperty/editProductProperty';
import type { IStoreProduct, extraData} from '@entities/products/model/types/IStoreProduct';
import { TextField } from '@shared/ui/textField';

import './editProductCard.scss';
import { ProductCollectionList } from '../productCollectionList/productCollectionList';
import { ProductTypeList } from '../productTypeList/productTypeList';
import { ProductUnitList } from '../productUnitList/productUnitList';
import { useCreateProduct } from '@entities/products/model/productsService';
import { Button } from '@shared/ui/button';
interface EditProductCardProps {
    product:  IStoreProduct
}

const extraDataDefault: extraData ={ 
    collection: {id:'1', value:'2,5 3 кг низ'},
    volume: 2000,
    weight: 0
};

export const EditProductCard: FC<EditProductCardProps> = ({ product }) => {
    
    const [createProduct] = useCreateProduct();

    product.quantity = product.quantity ?? 1000;
    const { name } = product;
    const methods = useForm<IStoreProduct>({
        defaultValues: product,
        mode: 'onChange'
    });

    const { watch, register, setValue, handleSubmit } = methods;
  
    useEffect(() => {
        const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
        return () => { subscription.unsubscribe(); };
    }, [watch]);

    const renderTextFieldProps = (fieldName: Path<IStoreProduct>, textFieldType: 'number' | 'text') => {
        return  <TextField 
            {...register(fieldName, { valueAsNumber: textFieldType==='number'})}
            className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

    const handleSet = <T extends Path<IStoreProduct>> (key: T, value: PathValue<IStoreProduct, T>) => {
        //@ts-ignore-next-line
        setValue(key, value);
    };


    const parseWeight = parseFloat(product.name.replace(/\D/g, ''));
    const weight = isNaN(parseWeight) ? 0 : parseWeight;
    if (!product.extraData) product.extraData = {...extraDataDefault};
    if (product.extraData && !product.extraData.weight) {
        product.extraData = {...product.extraData, weight: weight};
    }

    const collecion = watch('extraData.collection');
    const productType = watch('type');
    const unit = watch('unit');

    const handleCreate = (product: IStoreProduct) => {
        createProduct({...product, tax: 'NDS_NO_TAX'});
    };

    return (
        <>
            <div className="editCard">
                <h2 className='editCard__title'>{name}</h2>
                <div className='editCard__properties'>
                    <EditProductProperty propertyName='Наименование' renderEditField={() => renderTextFieldProps( 'name', 'text')}/>
                    <EditProductProperty propertyName='Вес товара' renderEditField={() => renderTextFieldProps('extraData.weight', 'number')}/>
                    <EditProductProperty propertyName='Ед. изм.' renderEditField={() => <ProductUnitList onChange={(value) => handleSet('unit', value)}
                        selected={unit}/>}/>
                    <EditProductProperty propertyName='Упаковка' renderEditField={() => <ProductCollectionList onChange={(value) => handleSet('extraData.collection', value)} 
                        selected={collecion}/>}/>
                    <EditProductProperty propertyName='Тип товара' renderEditField={() => <ProductTypeList onChange={(value)=>handleSet('type', value)} 
                        selected={productType}/>}/>
                </div>
                <Button onClick={handleSubmit(handleCreate)}>Создать товар</Button>
            </div>
        </>
    );
};


