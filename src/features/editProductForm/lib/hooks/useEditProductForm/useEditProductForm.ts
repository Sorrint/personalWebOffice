import {
  useRemoveInventoryProduct,
  useUpdateProducts,
  type IInventoryProduct,
} from '@entities/inventoryDocs';
import { type IDreamkasProduct } from '@entities/products';
import { useCallback, useState } from 'react';
import { type FieldValues } from 'react-hook-form';

export interface IFormProps {
  product: IInventoryProduct;
  popupText: string;
  buttonText: string;
  method: 'Delete' | 'Update' | 'Create';
}

export const useEditProductForm = (docNumber: number) => {
  const [formProps, setFormProps] = useState<IFormProps>();
  const [removeProduct] = useRemoveInventoryProduct();
  const [updateList, { error: updateError }] = useUpdateProducts();

  const displayUpdateForm = useCallback((product: IInventoryProduct) => {
    setFormProps({ product, buttonText: 'Обновить', popupText: '', method: 'Update' });
    // setActivePopup(true);
  }, []);

  const displayDeleteForm = useCallback((product: IInventoryProduct) => {
    setFormProps({ product, buttonText: 'Удалить', popupText: 'Вы уверены?', method: 'Delete' });
    // setActivePopup(true);
  }, []);

  const displayCreateForm = useCallback((product: IDreamkasProduct, isActiveAccount: boolean) => {
    const { name, price } = product;
    const newProduct = {
      name,
      price: price && price / 100,
      quantity: 1,
      id: undefined,
      isActiveAccount,
    };
    setFormProps({ product: newProduct, buttonText: 'Добавить', popupText: '', method: 'Create' });
  }, []);

  const onSubmit = async (data: FieldValues) => {
    if (formProps) {
      const { method, product } = formProps;
      method === 'Delete'
        ? await removeProduct({ id: product.id, docNumber }).unwrap()
        : await updateList({ product: { ...data }, docNumber }).unwrap();
    }

    // if (!updateError) showPopup();
  };

  return {
    displayCreateForm,
    displayUpdateForm,
    displayDeleteForm,
    onSubmit,
    updateError,
    formProps,
  };
};
