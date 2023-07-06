import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, type KeyboardEvent, useRef, type ForwardedRef } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { type IInventoryProduct } from '@entities/inventoryDocs/model/types';
import { useKeyPress } from '@shared/lib/hooks/useKeyPress/useKeyPress';
import { CounterField } from '@shared/ui/counterField/counterField';
import './popupCard.scss';

interface IPopupCardProps {
    product: IInventoryProduct
    buttonClick: (data: FieldValues) => Promise<void>
    buttonText: string
    error: FetchBaseQueryError | SerializedError | undefined
    popupText?: string
    method: string
    wrapperRef?: ForwardedRef<HTMLDivElement>
}
export interface FormValues {
    name: string
    price: number | null
    quantity: number
    id: string | undefined
}

export default function PopupCard ({ product, buttonClick, buttonText, error, popupText, method }: IPopupCardProps) {
    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            id: product.id,
            price: product.price,
            quantity: product.quantity,
            name: product.name
        },
        mode: 'onChange'
    });
    const modalWindow = useRef<HTMLInputElement>(null);

    const { isKeyPressed } = useKeyPress('Enter');
    const submitRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        submitRef.current?.focus();
        handleSubmit(buttonClick);
    }, [isKeyPressed]);

    const keyPressed = (e: KeyboardEvent, name: 'name' | 'price' | 'quantity' | 'id') => {
        if (e.key === 'Enter') {
            setValue(name, (e.target as HTMLInputElement).value);
        }
    };

    useEffect(() => {
        if (modalWindow.current) modalWindow.current.focus();
    }, [modalWindow]);
    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Space') {
            // e.preventDefault();
        }
    };

    const getButtonClass = () => {
        return method === 'Delete' ? 'delete-button' : 'submit-button';
    };

    return (
        <div className="popup__addProduct" onKeyDown={(key) => { handleKey(key); }} ref={modalWindow}>
            <form>
                <div className="popup__card">
                    <div className="popup__title">{product.name}</div>
                    <CounterField
                        label="Цена, ₽"
                        name={'price'}
                        register={register}
                        inputClass="popup__counter"
                        onKeyPress={keyPressed}
                    />
                    <CounterField
                        label="Количество"
                        name={'quantity'}
                        register={register}
                        inputClass="popup__counter"
                        onKeyPress={keyPressed}
                    />
                </div>
                {popupText && <h3>{popupText}</h3>}
                <button className={getButtonClass()} onClick={handleSubmit(buttonClick)} ref={submitRef}>
                    {buttonText}
                </button>
                {error && <div className="error-message">Произошла ошибка при отправке данных</div>}
            </form>
        </div>
    );
}
