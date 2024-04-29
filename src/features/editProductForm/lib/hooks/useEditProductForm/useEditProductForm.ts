import {
  useRemoveInventoryProduct,
  useUpdateProducts,
  type IInventoryProduct,
} from '@entities/inventoryDocs';
import { useKeyPress } from '@shared/lib/hooks';
import { useCallback, useEffect, useState } from 'react';
import { type FieldValues } from 'react-hook-form';

export type formVariants = 'delete' | 'update' | 'create';

export type IFormProps = {
  popupText: string;
  buttonText: string;
  product: IInventoryProduct;
  method: formVariants;
};

const formVariantsProps: Record<formVariants, Omit<IFormProps, 'product'>> = {
  delete: { buttonText: 'Удалить', popupText: 'Вы уверены?', method: 'delete' },
  update: { buttonText: 'Обновить', popupText: '', method: 'update' },
  create: { buttonText: 'Добавить', popupText: '', method: 'create' },
};

const isCreate = (value: formVariants) => value === 'create';

export const useEditProductForm = (
  docNumber: number,
  isModal?: boolean,
  onCloseModal?: () => void,
) => {
  const [activePopup, setActivePopup] = useState(false);
  const [formProps, setFormProps] = useState<IFormProps>();
  const [removeProduct] = useRemoveInventoryProduct();
  const [updateList, { error: updateError }] = useUpdateProducts();

  const { isKeyPressed } = useKeyPress('Escape');

  useEffect(() => {
    isKeyPressed && activePopup && setActivePopup(false);
    onCloseModal?.();
  }, [activePopup, isKeyPressed, onCloseModal]);

  const displayForm = useCallback(
    (variant: formVariants) => (product: IInventoryProduct) => {
      const formProduct = isCreate(variant) ? { ...product, id: undefined } : product;
      setFormProps({
        product: formProduct,
        ...formVariantsProps[variant],
      });
      isModal && setActivePopup(true);
    },
    [isModal],
  );

  const onSubmit = async (data: FieldValues) => {
    if (formProps) {
      const { method, product } = formProps;
      method === 'delete'
        ? await removeProduct({ id: product.id, docNumber }).unwrap()
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
    formProps,
  };
};
