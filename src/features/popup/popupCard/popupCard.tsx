import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IInventoryProduct } from '../../../entities/inventoryDocs/model/types';
import { IProduct } from '../../../entities/products/model/IProducts';
import CounterField from '../../../shared/ui/counterField/counterField';

interface IPopupCardProps<T extends FieldValues> {
    product: IProduct | IInventoryProduct;
    register: UseFormRegister<T>;
    fields: { priceName: Path<T>; quantityName: Path<T> };
}

export default function PopupCard<T extends FieldValues>({ product, register, fields }: IPopupCardProps<T>) {
    const { priceName, quantityName } = fields;
    return (
        <div className="popup__card">
            <div className="popup__title">{product.name}</div>
            <CounterField label="Цена, ₽" name={priceName} register={register} inputClass="popup__counter" />
            <CounterField label="Количество" name={quantityName} register={register} inputClass="popup__counter" />
        </div>
    );
}
