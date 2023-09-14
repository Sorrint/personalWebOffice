import { useEffect, type KeyboardEvent, useRef, type ForwardedRef, type FocusEvent } from 'react';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { type FieldValues, useForm } from 'react-hook-form';
import { type SerializedError } from '@reduxjs/toolkit';

import { type IInventoryProduct } from '@entities/inventoryDocs/model/types';
import { useKeyPress } from '@shared/lib/hooks/useKeyPress/useKeyPress';
import { CounterField } from '@shared/ui/counterField/counterField';

import './popupProductCard.scss';

interface PopupProductCardProps {
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

export function PopupProductCard ({ product, buttonClick, buttonText, error, popupText, method }: PopupProductCardProps) {
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
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.target.select();
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
                        onFocus={handleFocus}
                    />
                    <CounterField
                        label="Количество"
                        name={'quantity'}
                        register={register}
                        inputClass="popup__counter"
                        onKeyPress={keyPressed}
                        onFocus={handleFocus}
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
