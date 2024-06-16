import { useEffect, type KeyboardEvent, useRef, type FocusEvent } from 'react';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { type FieldValues, useForm } from 'react-hook-form';
import { type SerializedError } from '@reduxjs/toolkit';

import { type IInventoryProduct } from '@entities/inventoryDocs';
import { useKeyPress } from '@shared/lib/hooks/useKeyPress/useKeyPress';
import { CounterField } from '@shared/ui/counterField/counterField';
import { Button } from '@shared/ui/button';

import styles from './popupProductCard.module.scss';
import classNames from 'classnames';

interface PopupProductCardProps {
  product: IInventoryProduct;
  buttonClick: (data: FieldValues) => Promise<void>;
  buttonText: string;
  error: FetchBaseQueryError | SerializedError | undefined;
  popupText?: string;
  method: string;
  isActive: boolean;
}
export interface FormValues {
  name: string;
  price: number | null;
  quantity: number;
  id: string | undefined;
  isActiveAccount: boolean;
}

export function PopupProductCard({
  product,
  buttonClick,
  buttonText,
  error,
  popupText,
  method,
  isActive,
}: PopupProductCardProps) {
  const initData: FormValues = {
    id: product.id,
    price: product.price,
    quantity: product.quantity,
    name: product.name,
    isActiveAccount: product.isActiveAccount ?? true,
  };
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: initData,
    mode: 'onChange',
  });
  const modalWindow = useRef<HTMLInputElement>(null);
  const { isKeyPressed } = useKeyPress('Enter');
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    submitRef.current?.focus();
    handleSubmit(buttonClick);
  }, [buttonClick, handleSubmit, isKeyPressed]);

  const keyPressed = (e: KeyboardEvent, name: string) => {
    if (e.key === 'Enter' && name in initData) {
      setValue(name as keyof typeof initData, (e.target as HTMLInputElement).value);
    }
  };

  useEffect(() => {
    if (modalWindow.current) modalWindow.current.focus();
  }, [modalWindow]);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const getButtonType = () => {
    return method === 'Delete' ? 'cancel' : 'submit';
  };

  return (
    <div
      className={classNames(styles['add-product'], { [styles['old-account']]: !isActive })}
      ref={modalWindow}
    >
      <form>
        <div className={styles.card}>
          <h2>{product.name}</h2>
          <CounterField
            label='Количество'
            {...register('quantity', { valueAsNumber: true, min: 0 })}
            classname={styles.counter}
            onKeyPress={keyPressed}
            onFocus={handleFocus}
            min={0}
          />
          <CounterField
            label='Цена, ₽'
            {...register('price', { valueAsNumber: true, min: 0 })}
            min={0}
            classname={styles.counter}
            onKeyPress={keyPressed}
            onFocus={handleFocus}
          />
          {popupText && <h3>{popupText}</h3>}
          <Button buttonType={getButtonType()} onClick={handleSubmit(buttonClick)} ref={submitRef}>
            {buttonText}
          </Button>
          {error && (
            <div className={styles['error-message']}>Произошла ошибка при отправке данных</div>
          )}
        </div>
      </form>
    </div>
  );
}
