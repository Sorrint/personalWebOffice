import { useEffect, type KeyboardEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { type SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { type IInventoryProduct } from '@entities/Inventories';
import { useKeyPress } from '@shared/lib/hooks/useKeyPress/useKeyPress';
import { CounterField } from '@shared/ui/CounterField';
import { Button } from '@shared/ui/Button';
import { TextField } from '@shared/ui/TextField';

import styles from './EditProductForm.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '@shared/lib/hooks';
import { selectFormProduct, selectFormProps } from '../../model/selectors/EditProductFormSelectors';

export interface EditProductFormProps {
  buttonClick: (item: IInventoryProduct) => Promise<void>;
  error: FetchBaseQueryError | SerializedError | undefined;
  highlightFunc?: (item: IInventoryProduct) => boolean;
}

export function EditProductForm({ buttonClick, error, highlightFunc }: EditProductFormProps) {
  const product = useAppSelector(selectFormProduct);
  const { buttonText, method, popupText } = useAppSelector(selectFormProps);
  const initData: Partial<IInventoryProduct> = {
    id: product?.id,
    price: product?.price,
    quantity: product?.quantity,
    name: product?.name,
    isActiveAccount: product?.isActiveAccount ?? true,
  };
  const { register, handleSubmit, setValue } = useForm<IInventoryProduct>({
    defaultValues: initData,
    mode: 'onChange',
  });
  const modalWindow = useRef<HTMLInputElement>(null);
  const { isKeyPressed } = useKeyPress('Enter');
  const submitRef = useRef<HTMLButtonElement>(null);
  // const quantityRef = useRef<HTMLInputElement>(null);

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

  const getButtonType = () => {
    return method === 'delete' ? 'cancel' : 'submit';
  };

  if (!product) {
    return null;
  }

  return (
    <div
      className={classNames(styles['add-product'], {
        [styles.highlight]: product && highlightFunc?.(product),
      })}
      ref={modalWindow}
    >
      <form>
        <div className={styles.card}>
          {product.name && <h2>{product.name}</h2>}
          {!product.name && <TextField {...register('name')} />}
          <CounterField
            selectOnFocus
            label='Количество'
            {...register('quantity', { valueAsNumber: true, min: 0 })}
            className={styles.counter}
            onKeyPress={keyPressed}
            min={0}
            setValue={setValue}
          />
          <CounterField
            label='Цена, ₽'
            {...register('price', { valueAsNumber: true, min: 0 })}
            min={0}
            className={styles.counter}
            onKeyPress={keyPressed}
            setValue={setValue}
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
