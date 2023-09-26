import  { type Path, type PathValue} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import  { type IStoreProduct, type extraData, EditProductProperty, useCreateProduct} from '@entities/products';
import { UnitSelect, UnitTypeSelect, UnitTypes } from '@entities/units';
import { PackageSelect } from '@entities/packages';
import { TextField } from '@shared/ui/textField';
import { Button } from '@shared/ui/button';

import { parseWeightKg } from '../../lib/helpers/parseWeightKg/parseWeightKg';
import './editProductCard.scss';

interface EditProductCardProps <T extends IStoreProduct>{
    product: T
}

const extraDataDefault: extraData ={ 
    weight: 0
};

export const EditProductCard = <T extends IStoreProduct>({ product }:EditProductCardProps<T>) => {

    const [createProduct] = useCreateProduct();

    const { name } = product;
    const methods = useForm<IStoreProduct>({
        defaultValues: product,
        mode: 'onChange'
    });

    product.type = product.type ?? UnitTypes.COUNTABLE;
    
    const { watch, register, setValue, handleSubmit } = methods;
  
    useEffect(() => {
        const subscription = watch((value, { name, type }) => { console.log(value, name, type); });
        return () => { subscription.unsubscribe(); };
    }, [watch]);

    const handleSet = <T extends Path<IStoreProduct>> (key: T, value: PathValue<IStoreProduct, T>) => {
        //@ts-ignore-next-line
        setValue(key, value);
    };

    const weight = parseWeightKg(product.name);


    if (!product.extraData) product.extraData = {...extraDataDefault};
    if (product.extraData && !product.extraData.weight) {
        product.extraData = {...product.extraData, weight: weight};
    }

    const container = watch('extraData.package');
    const unit = watch('unit');
    const type = watch('type') ;
    const weightUnit = watch('extraData.weightUnit');


    const handleCreate = (product: IStoreProduct) => {
        createProduct({...product, tax: 'NDS_NO_TAX'});
    };

    return (
        <>
            <div className="editCard">
                <h2 className='editCard__title'>{name}</h2>
                <div className='editCard__properties'>
                    <EditProductProperty propertyName='Наименование'>
                        <TextField  
                            {...register('name')} 
                            className= {`editCard__cell editItem__name`} />
                    </EditProductProperty>
                    
                    {type !== UnitTypes.COUNTABLE && 
                        <EditProductProperty propertyName='Ед.изм.товара'>
                            <UnitSelect 
                                onChange={(value) => handleSet('unit', value)} 
                                type={type} 
                                id={unit}/>
                        </EditProductProperty>}
                             
                    <EditProductProperty propertyName='Тип товара'>
                        <UnitTypeSelect 
                            onChange={(value) => handleSet('type', value)} 
                            type={type} />
                    </EditProductProperty> 
                       
                    <EditProductProperty propertyName='Вес нетто товара'>
                        <TextField  
                            {...register('extraData.weight') } 
                            className= {`editCard__cell editItem__name`} 
                            type='number'/>
                    </EditProductProperty>

                    <EditProductProperty propertyName='Ед. изм. веса'>
                        <UnitSelect 
                            onChange={(value) => handleSet('extraData.weightUnit', value)} 
                            type={UnitTypes.WEIGHTABLE} 
                            id={weightUnit}/>
                    </EditProductProperty>
                    
                    <EditProductProperty propertyName='Упаковка'>    
                        <PackageSelect 
                            onChange={(value) => handleSet('extraData.package', value)} 
                            id={container} 
                            content='category'/>
                    </EditProductProperty> 
                </div>

                <Button onClick={handleSubmit(handleCreate)}>Создать товар</Button>
            </div>
        </>
    );
};


