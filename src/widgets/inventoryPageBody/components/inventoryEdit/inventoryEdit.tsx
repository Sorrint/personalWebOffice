import { memo, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useEditProductForm, PopupEditProductForm } from '@features/editProductForm';
import { SaveInventoryToXLSX } from '@features/saveInventoryToXLSX';
import {
  type IInventoryProduct,
  useLoadDocumentByNumber,
  InventoryProductsTable,
} from '@entities/inventoryDocs';
import { PopoverProductsList } from '@entities/products';
import { useInputText, useSearchInput, useSearchInputPopover } from '@shared/lib/hooks';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { SearchInput } from '@shared/ui/searchInput';
import { Checkbox } from '@shared/ui/checkbox';
import { Grid } from '@shared/ui/grid';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { editProductFormReducer } from '@features/editProductForm';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';
import { Button } from '@shared/ui/button';

import { useLoadInventoryProductsBySearch } from '../../hooks/useLoadInventoryProductsBySearch';
import styles from './inventoryEdit.module.scss';

const highlightByAccount = (item: IInventoryProduct) => {
  return !item?.isActiveAccount;
};

const reducers: ReducersList = {
  editProductForm: editProductFormReducer,
};

export const InventoryEdit = memo(() => {
  const { number } = useParams();
  const docNumber = Number(number);
  const { searchInputRef, setFirstListElement, firstListElement } = useSearchInput();

  const focusOnSearchInput = () => searchInputRef?.current?.focus();

  useInputText(focusOnSearchInput);

  const { activePopup, displayForm, updateError, setActivePopup, onSubmit } = useEditProductForm(
    docNumber,
    true,
  );

  const { activePopover, setActivePopover } = useSearchInputPopover();

  // Загрузка данных
  const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);
  const { goods, isFetching, setSearch } = useLoadInventoryProductsBySearch();

  const [highlightFunc, setHighlightFunc] = useState<
    ((item: IInventoryProduct) => boolean) | undefined
  >(undefined);

  const handleCreate = useCallback(
    (product: IInventoryProduct) => {
      displayForm('create')(product);
      setActivePopover(false);
      setActivePopup(true);
    },
    [displayForm, setActivePopover, setActivePopup],
  );

  const getGoods = async (value: string) => {
    setActivePopover(false);
    setSearch(value);
  };

  const createNewProduct = useCallback(() => {
    displayForm('create')({ name: '', quantity: 1, price: 1, id: uuidv4() });
    setActivePopup(true);
  }, []);

  const popoverCondition = goods && goods?.length !== 0 && !activePopup;

  useEffect(() => {
    if (goods) {
      goods.length === 1 ? handleCreate(goods[0]) : setActivePopover(goods?.length > 0);
    }
  }, [goods, handleCreate, setActivePopover]);

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
      {popoverCondition && activePopover && (
        <PopoverProductsList
          products={goods}
          onClick={handleCreate}
          parentRef={searchInputRef}
          setFirstElement={setFirstListElement}
        />
      )}
    </>
  );

  return (
    <AsyncReduxComponent reducersList={reducers}>
      <Grid>
        <SearchInput
          searchFunction={getGoods}
          loading={isFetching}
          canShowPopover={popoverCondition}
          renderList={renderList}
          activePopover={activePopover}
          firstListElement={firstListElement}
          searchInputRef={searchInputRef}
          setActivePopover={setActivePopover}
        />
        <div className={styles.controls}>
          <Checkbox
            text='Выделять поля с резервного аккаунта'
            name='tempAcc'
            onChange={handleCheckboxClick}
            defaultChecked={localStorage.getItem('highlight') === 'true'}
          />
          <SaveInventoryToXLSX inventoryList={inventoryList} classname={styles.xlsx} />
          <Button onClick={createNewProduct}>Добавить товар</Button>
        </div>
        <h1>
          {`Инвентаризация № ${inventoryList.documentNumber} от `}
          <FormatDate date={inventoryList.choosenDate} />
          {` магазина ${inventoryList.storeName}`}
        </h1>
        <ScrollableBlock>
          <InventoryProductsTable
            highlightFunc={highlightFunc}
            inventoryList={inventoryList}
            onClick={displayForm('update')}
            onDelete={displayForm('delete')}
            tabIndex={activePopup ? -1 : 0}
          />
        </ScrollableBlock>
      </Grid>
      <PopupEditProductForm
        activePopup={activePopup}
        buttonClick={onSubmit}
        error={updateError}
        setActivePopup={setActivePopup}
        highlightFunc={highlightFunc}
      />
    </AsyncReduxComponent>
  );
});

InventoryEdit.displayName = 'inventoryEdit';
