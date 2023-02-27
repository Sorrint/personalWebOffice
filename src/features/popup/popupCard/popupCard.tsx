import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { IInventoryProduct } from '../../../entities/inventoryDocs/model/types';
import { useKeyPress } from '../../../shared/lib/hooks/useKeyPress/useKeyPress';
import CounterField from '../../../shared/ui/counterField/counterField';

interface IPopupCardProps<T extends FieldValues> {
    product: IInventoryProduct;
    buttonClick: (data: FieldValues) => Promise<void>;
    buttonText: string;
    error: FetchBaseQueryError | SerializedError | undefined;
    popupText?: string;
    method: string;
}
export type FormValues = {
    name: string;
    price: number | null;
    quantity: number;
    id: string | undefined;
};

export default function PopupCard<T extends FieldValues>({
    product,
    buttonClick,
    buttonText,
    error,
    popupText,
    method
}: IPopupCardProps<T>) {
    const { register, handleSubmit, getValues } = useForm<FormValues>({
        defaultValues: {
            id: product.id,
            price: product.price,
            quantity: product.quantity,
            name: product.name
        },
        mode: 'onChange'
    });
    const isEnterPressed = useKeyPress('Enter');
    useEffect(() => {
        if (isEnterPressed === true) {
            const values = getValues();
            console.log(values);
            // handleSubmit(buttonClick)();
        }
    }, [isEnterPressed]);
    const getButtonClass = () => {
        return method === 'Delete' ? 'delete-button' : 'submit-button';
    };

    return (
        <div className="popup__addProduct">
            <div className="popup__card">
                <div className="popup__title">{product.name}</div>
                <CounterField label="Цена, ₽" name={'price'} register={register} inputClass="popup__counter" />
                <CounterField label="Количество" name={'quantity'} register={register} inputClass="popup__counter" />
            </div>
            {popupText && <h3>{popupText}</h3>}
            <button className={getButtonClass()} onClick={handleSubmit(buttonClick)}>
                {buttonText}
            </button>
            {error && <div className="error-message">Произошла ошибка при отправке данных</div>}
        </div>
    );
}
