import  { type Path, type PathValue} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { EditProductProperty } from '@entities/products/components/editProductProperty/editProductProperty';
import  { type IStoreProduct, type extraData} from '@entities/products/model/types/IStoreProduct';
import { TextField } from '@shared/ui/textField';

import './editProductCard.scss';

import { useCreateProduct } from '@entities/products/model/productsService';
import { Button } from '@shared/ui/button';
import { PackageSelect } from '@entities/packages';
import { parseWeightKg } from '../../entities/products/lib/helpers/parseWeightKg/parseWeightKg';
import { UnitSelect, UnitTypeSelect } from '@entities/units';
import { UnitTypes } from '@entities/units/components/unitTypeSelect/unitTypeSelect';

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

    const renderTextFieldProps = (fieldName: Path<IStoreProduct>, textFieldType: 'number' | 'text') => {
        return  <TextField 
            {...register(fieldName, { valueAsNumber: textFieldType==='number'})}
            className= {`editCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

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
                    <EditProductProperty propertyName='Наименование' renderEditField={() => renderTextFieldProps( 'name', 'text')}/>
                    {type !== UnitTypes.COUNTABLE && <EditProductProperty propertyName='Ед.изм.товара' renderEditField={() => <UnitSelect onChange={(value) => handleSet('unit', value)} type={type} id={unit}/>}/>}
                    <EditProductProperty propertyName='Тип товара' renderEditField={() => <UnitTypeSelect onChange={(value) => handleSet('type', value)} type={type} />}/>
                    <EditProductProperty propertyName='Вес нетто товара' renderEditField={() => renderTextFieldProps('extraData.weight', 'number')}/>
                    <EditProductProperty propertyName='Ед. изм. веса' renderEditField={() => <UnitSelect onChange={(value) => handleSet('extraData.weightUnit', value)} type={UnitTypes.WEIGHTABLE} id={weightUnit}/>}/>
                    <EditProductProperty propertyName='Упаковка' renderEditField={() => <PackageSelect onChange={(value) => handleSet('extraData.package', value)} id={container} content='category'/>}/>
                </div>
                <Button onClick={handleSubmit(handleCreate)}>Создать товар</Button>
            </div>
        </>
    );
};


