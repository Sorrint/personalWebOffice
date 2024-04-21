import { memo, useEffect, useState, useCallback } from 'react';
import { type FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SaveInventoryToXLSX } from '@features/saveInventoryToXLSX';
import {
  type IInventoryProduct,
  useUpdateProducts,
  useRemoveInventoryProduct,
  useLoadDocumentByNumber,
  InventoryProductsTable,
} from '@entities/inventoryDocs';
import { type IDreamkasProduct, ProductList, PopupProductCard } from '@entities/products';
import { useKeyPress, useSearchInput } from '@shared/lib/hooks';
import { Container } from '@shared/layouts/container/container';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { SearchInput } from '@shared/ui/searchInput';
import { PopupWithFocusTrap } from '@shared/ui/popup';
import { Checkbox } from '@shared/ui/checkbox';
import { Grid } from '@shared/ui/grid';

import { useLoadInventoryProducts } from '../../hooks/useLoadInventoryProducts';

import styles from './inventoryEdit.module.scss';

interface IPopupProps {
  product: IInventoryProduct;
  popupText: string;
  buttonText: string;
  method: 'Delete' | 'Update' | 'Create';
}

const highlightByAccount = (item: IInventoryProduct) => {
  return !item?.isActiveAccount;
};

export const InventoryEdit = memo(() => {
  const { number } = useParams();
  // if (!number) return null;
  const docNumber = Number(number);
  const [popupProps, setPopupProps] = useState<IPopupProps>();
  const [updateList, { error: updateError }] = useUpdateProducts();
  const [removeProduct] = useRemoveInventoryProduct();
  const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);

  // Загрузка данных
  const { goods, isFetching, setSearch, isActiveAccount } = useLoadInventoryProducts();

  // состояния popup && popover
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const { searchInputRef, setFirstListElement, firstListElement } = useSearchInput();
  const { isKeyPressed, setIsKeyPressed } = useKeyPress('Escape');

  const handleCreate = useCallback((product: IDreamkasProduct, isActiveAccount: boolean) => {
    const { name, price } = product;
    const newProduct = {
      name,
      price: price && price / 100,
      quantity: 1,
      id: undefined,
      isActiveAccount,
    };
    setShowPopover(false);
    setPopupProps({ product: newProduct, buttonText: 'Добавить', popupText: '', method: 'Create' });
    setActivePopup(true);
  }, []);

  useEffect(() => {
    setIsKeyPressed(false);
    setActivePopup(false);
    setShowPopover(false);
  }, [isKeyPressed, setIsKeyPressed]);

  useEffect(() => {
    if (goods) {
      goods.length === 1
        ? handleCreate(goods[0], isActiveAccount)
        : setShowPopover(goods?.length > 0);
    }
  }, [goods, handleCreate, isActiveAccount]);

  const getGoods = async (value: string) => {
    setShowPopover(false);
    setSearch(value);
  };

  const popoverCondition = goods && goods?.length !== 0 && !activePopup;

  const showPopup = () => {
    setActivePopup(prevState => !prevState);
  };

  const handleUpdate = useCallback((product: IInventoryProduct) => {
    setPopupProps({ product, buttonText: 'Обновить', popupText: '', method: 'Update' });
    setActivePopup(true);
  }, []);

  const handleDelete = useCallback((product: IInventoryProduct) => {
    setPopupProps({ product, buttonText: 'Удалить', popupText: 'Вы уверены?', method: 'Delete' });
    setActivePopup(true);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    if (popupProps) {
      const { method, product } = popupProps;
      method === 'Delete'
        ? await removeProduct({ id: product.id, docNumber }).unwrap()
        : await updateList({ product: { ...data }, docNumber }).unwrap();
    }

    if (!updateError) showPopup();
  };

  const [highlightFunc, setHighlightFunc] = useState<
    ((item: IInventoryProduct) => boolean) | undefined
  >(undefined);

  useEffect(() => {
    const highlightOn = localStorage.getItem('highlight') === 'true';
    setHighlightFunc(() => (highlightOn ? highlightByAccount : undefined));
  }, []);
  const handleCheckboxClick = useCallback((checked: boolean) => {
    checked ? localStorage.setItem('highlight', 'true') : localStorage.setItem('highlight', '');
    setHighlightFunc(() => (checked ? highlightByAccount : undefined));
  }, []);

  if (!inventoryList?.products) return 'Нет данных для отображения';

  if (isLoading) return 'Идет загрузка...';

  const renderList = () => (
    <>
      {popoverCondition && (
        <ProductList
          products={goods}
          selectField={false}
          avatar={false}
          count={false}
          onClick={product => {
            handleCreate(product, isActiveAccount);
          }}
          setFirstElement={setFirstListElement}
          parentRef={searchInputRef}
          displayHeaders={false}
        />
      )}
    </>
  );

  return (
    <>
      <Container>
        <Grid>
          <SearchInput
            searchFunction={getGoods}
            loading={isFetching}
            canShowPopover={popoverCondition}
            renderList={renderList}
            showPopover={showPopover}
            firstListElement={firstListElement}
            searchInputRef={searchInputRef}
          />
          <div className={styles.controls}>
            <Checkbox
              text='Выделять поля с резервного аккаунта'
              name='tempAcc'
              onChange={handleCheckboxClick}
              defaultChecked={localStorage.getItem('highlight') === 'true'}
            />
            <SaveInventoryToXLSX inventoryList={inventoryList} />
          </div>
          <h1>
            {`Инвентаризация № ${inventoryList.documentNumber} от `}
            <FormatDate date={inventoryList.choosenDate} />
            {` магазина ${inventoryList.storeName}`}
          </h1>
        </Grid>
      </Container>
      <Container scrollable>
        <InventoryProductsTable
          highlightFunc={highlightFunc}
          inventoryList={inventoryList}
          onClick={handleUpdate}
          onDelete={handleDelete}
          tabIndex={activePopup ? -1 : 0}
        />
      </Container>
      <PopupWithFocusTrap isOpened={activePopup} onClose={showPopup}>
        {popupProps && (
          <PopupProductCard
            {...popupProps}
            buttonClick={onSubmit}
            error={updateError}
            isActive={isActiveAccount}
          />
        )}
      </PopupWithFocusTrap>
    </>
  );
});

InventoryEdit.displayName = 'inventoryEdit';
