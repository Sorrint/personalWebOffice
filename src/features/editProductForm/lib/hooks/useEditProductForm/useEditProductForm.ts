import { useCallback, useEffect, useState } from 'react';
import {
  useRemoveInventoryProduct,
  useUpdateProducts,
  type IInventoryProduct,
} from '@entities/inventories';
import { editProductFromActions } from '../../../model/slices/EditProductFormSlice';
import { useAppDispatch, useAppSelector, useKeyPress } from '@shared/lib/hooks';
import { type FieldValues } from 'react-hook-form';
import { type FormVariants, type IFormProps } from '../../../model/types/EditProductForm';
import { selectFormProps } from '../../../model/selectors/EditProductFormSelectors';

const formVariantsProps: Record<FormVariants, Omit<IFormProps, 'product'>> = {
  delete: { buttonText: 'Удалить', popupText: 'Вы уверены?', method: 'delete' },
  update: { buttonText: 'Обновить', popupText: '', method: 'update' },
  create: { buttonText: 'Добавить', popupText: '', method: 'create' },
};

const isCreate = (value: FormVariants) => value === 'create';

export const useEditProductForm = (
  docNumber: number,
  isModal?: boolean,
  onCloseModal?: () => void,
) => {
  const dispatch = useAppDispatch();
  const formProps = useAppSelector(selectFormProps);

  const [activePopup, setActivePopup] = useState(false);
  const [removeProduct] = useRemoveInventoryProduct();
  const [updateList, { error: updateError }] = useUpdateProducts();

  const { isKeyPressed } = useKeyPress('Escape');

  useEffect(() => {
    isKeyPressed && activePopup && setActivePopup(false);
    onCloseModal?.();
  }, [activePopup, isKeyPressed, onCloseModal]);

  const displayForm = useCallback(
    (variant: FormVariants) => (product: IInventoryProduct) => {
      const formProduct = isCreate(variant) ? { ...product, id: undefined } : product;
      dispatch(
        editProductFromActions.setForm({
          product: formProduct,
          formProps: formVariantsProps[variant],
        }),
      );

      isModal && setActivePopup(true);
    },
    [dispatch, isModal],
  );

  const onSubmit = async (data: FieldValues) => {
    if (!data.name) {
      setActivePopup(false);
      return;
    }

    if (formProps) {
      const { method } = formProps;
      method === 'delete'
        ? await removeProduct({ id: data.id, docNumber }).unwrap()
        : await updateList({ product: { ...data }, docNumber }).unwrap();
    }

    if (!updateError) {
      setActivePopup(false);
      onCloseModal?.();
    }
  };

  return {
    activePopup,
    onSubmit,
    setActivePopup,
    displayForm,
    updateError,
  };
};
