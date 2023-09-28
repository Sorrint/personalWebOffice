import  { type Path, type PathValue} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import  { type IStoreProduct, type extraData, EditProductProperty, useCreateProduct} from '@entities/products';
import { UnitSelect, UnitTypeSelect, UnitTypes, useGetUnits } from '@entities/units';
import { PackageSelect } from '@entities/packages';
import { TextField } from '@shared/ui/textField';
import { Button } from '@shared/ui/button';

import { parseWeightKg } from '../../lib/helpers/parseWeightKg/parseWeightKg';
import './editProductCard.scss';

interface EditProductCardProps <T extends IStoreProduct>{
    product: T
    onSubmit?: (product: IStoreProduct) => void
}

const extraDataDefault: extraData ={ 
    weight: 0
};

export const EditProductCard = <T extends IStoreProduct>({ product, onSubmit }:EditProductCardProps<T>) => {

    const [createProduct] = useCreateProduct();
    const { data: units } = useGetUnits();
    const { name } = product;
    const methods = useForm<IStoreProduct>({
        defaultValues: product,
        mode: 'onChange'
    });

    product.type = product.type ?? UnitTypes.COUNTABLE;
    
    const { watch, register, setValue, handleSubmit } = methods;

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


    const handleCreate = async (product: IStoreProduct) => {
        const createdProduct = await createProduct({...product, tax: 'NDS_NO_TAX'});
        if ('data' in createdProduct) {
            onSubmit?.(createdProduct.data);
        }
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
                    
                    {units && type && type !== UnitTypes.COUNTABLE && 
                        <EditProductProperty propertyName='Ед.изм.товара'>
                            <UnitSelect 
                                units={units}
                                onChange={(value) => handleSet('unit', value)} 
                                type={type} 
                                id={unit}/>
                        </EditProductProperty>}
                             
                    <EditProductProperty propertyName='Тип товара'>
                        <UnitTypeSelect 
                            onChange={(value) => handleSet('type', value)} 
                            type={type} />
                    </EditProductProperty> 

                    {units && type && type === UnitTypes.COUNTABLE &&    
                        (<><EditProductProperty propertyName='Вес нетто товара'>
                            <TextField  
                                {...register('extraData.weight', {valueAsNumber: true}) } 
                                className= {`editCard__cell editItem__name`} 
                                type='number'/>
                        </EditProductProperty>

                        <EditProductProperty propertyName='Ед. изм. веса'>
                            <UnitSelect 
                                units={units}
                                onChange={(value) => handleSet('extraData.weightUnit', value)} 
                                type={UnitTypes.WEIGHTABLE} 
                                id={weightUnit}/>
                        </EditProductProperty></>)}
                     
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


