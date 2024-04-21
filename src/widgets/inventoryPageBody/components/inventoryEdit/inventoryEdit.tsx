import { memo, useEffect, useState, useCallback } from 'react';
import { type FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SaveInventoryToXLSX } from '@features/saveInventoryToXLSX';
import {
  type IInventoryProduct,
  useLoadDocumentByNumber,
  InventoryProductsTable,
} from '@entities/inventoryDocs';
import { type IDreamkasProduct, ProductList } from '@entities/products';
import { useKeyPress, useSearchInput } from '@shared/lib/hooks';
import { Container } from '@shared/layouts/container/container';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { SearchInput } from '@shared/ui/searchInput';
import { PopupWithFocusTrap } from '@shared/ui/popup';
import { Checkbox } from '@shared/ui/checkbox';
import { Grid } from '@shared/ui/grid';

import { useLoadInventoryProducts } from '../../hooks/useLoadInventoryProducts';

import styles from './inventoryEdit.module.scss';
import { EditProductForm, useEditProductForm } from '@features/editProductForm';

const highlightByAccount = (item: IInventoryProduct) => {
  return !item?.isActiveAccount;
};

export const InventoryEdit = memo(() => {
  const { number } = useParams();
  const docNumber = Number(number);
  const {
    displayCreateForm,
    displayDeleteForm,
    displayUpdateForm,
    onSubmit,
    updateError,
    formProps,
  } = useEditProductForm(docNumber);

  // Загрузка данных
  const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);
  const { goods, isFetching, setSearch, isActiveAccount } = useLoadInventoryProducts();

  // состояния popup && popover
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const { searchInputRef, setFirstListElement, firstListElement } = useSearchInput();
  const { isKeyPressed } = useKeyPress('Escape');
  const [highlightFunc, setHighlightFunc] = useState<
    ((item: IInventoryProduct) => boolean) | undefined
  >(undefined);

  const handleCreate = useCallback(
    (product: IDreamkasProduct, isActiveAccount: boolean) => {
      displayCreateForm(product, isActiveAccount);
      setShowPopover(false);
      setActivePopup(true);
    },
    [displayCreateForm],
  );

  const getGoods = async (value: string) => {
    setShowPopover(false);
    setSearch(value);
  };

  const popoverCondition = goods && goods?.length !== 0 && !activePopup;

  const handleUpdate = useCallback(
    (product: IInventoryProduct) => {
      displayUpdateForm(product);
      setActivePopup(true);
    },
    [displayUpdateForm],
  );

  const handleDelete = useCallback(
    (product: IInventoryProduct) => {
      displayDeleteForm(product);
      setActivePopup(true);
    },
    [displayDeleteForm],
  );

  const handleSubmit = async (data: FieldValues) => {
    onSubmit(data);

    if (!updateError) setActivePopup(false);
  };

  useEffect(() => {
    setActivePopup(false);
    setShowPopover(false);
    searchInputRef.current?.focus();
  }, [isKeyPressed, searchInputRef]);

  useEffect(() => {
    if (goods) {
      goods.length === 1
        ? handleCreate(goods[0], isActiveAccount)
        : setShowPopover(goods?.length > 0);
    }
  }, [goods, displayCreateForm, isActiveAccount, handleCreate]);

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
            setShowPopover={setShowPopover}
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
      <PopupWithFocusTrap isOpened={activePopup} onClose={() => setActivePopup(false)}>
        {formProps && (
          <EditProductForm
            {...formProps}
            buttonClick={handleSubmit}
            error={updateError}
            isActive={isActiveAccount}
          />
        )}
      </PopupWithFocusTrap>
    </>
  );
});

InventoryEdit.displayName = 'inventoryEdit';
