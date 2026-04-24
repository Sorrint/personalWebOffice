import { memo, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useEditProductForm, PopupEditProductForm } from '@features/EditProductForm';
import { SaveInventoryToXLSX } from '@features/SaveInventoryToXLSX';
import {
  type InventoryProduct,
  useLoadDocumentByNumber,
  InventoryProductsTable,
} from '@entities/Inventories';
import { PopoverProductsList, useLoadAllProductsCached } from '@entities/Products';
import { useInputText, useSearchInput, useSearchInputPopover } from '@shared/lib/hooks';
// import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { SearchInput } from '@shared/ui/SearchInput';
import { Checkbox } from '@shared/ui/Checkbox';
import { Grid } from '@shared/ui/Grid';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { editProductFormReducer } from '@features/EditProductForm';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';
import { Button } from '@shared/ui/Button';

import { useSearchProductsFromCache } from '../../lib/hooks/useSearchProductsFromCache';
import { useLoadInventoryProductsBySearch } from '../../lib/hooks/useLoadInventoryProductsBySearch';
import styles from './InventoryEdit.module.scss';

const highlightByAccount = (item: InventoryProduct) => {
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
  useLoadAllProductsCached();

  const [serverSearch, setServerSearch] = useState<string>('');
  const [useCache, setUseCache] = useState(
    () => localStorage.getItem('feature_productsCache') !== 'false',
  );

  const handleCacheToggle = useCallback((checked: boolean) => {
    localStorage.setItem('feature_productsCache', String(checked));
    setUseCache(checked);
  }, []);

  const {
    goods: cacheGoods,
    isFetching: cacheFetching,
    search: searchFromCache,
  } = useSearchProductsFromCache();
  const { goods: serverGoods, isFetching: serverFetching } = useLoadInventoryProductsBySearch(
    serverSearch,
    useCache,
  );

  const goods = useCache ? cacheGoods : serverGoods;
  const isFetching = useCache ? cacheFetching : serverFetching;

  const [highlightFunc, setHighlightFunc] = useState<
    ((item: InventoryProduct) => boolean) | undefined
  >(() => (localStorage.getItem('highlight') === 'true' ? highlightByAccount : undefined));

  const handleCreate = useCallback(
    (product: InventoryProduct) => {
      displayForm('create')(product);
      setActivePopover(false);
      setActivePopup(true);
    },
    [displayForm, setActivePopover, setActivePopup],
  );

  useEffect(() => {
    if (!activePopup && searchInputRef) {
      searchInputRef.current?.select();
    }
  }, [activePopup]);

  const getGoods = useCallback(
    async (value: string) => {
      setActivePopover(false);
      if (useCache) {
        const results = await searchFromCache(value);
        if (results.length === 1) handleCreate(results[0]);
        else setActivePopover(results.length > 0);
      } else {
        setServerSearch(value);
      }
    },
    [useCache, searchFromCache, handleCreate, setActivePopover],
  );

  const createNewProduct = useCallback(() => {
    displayForm('create')({ name: '', quantity: 1, price: 1, id: uuidv4() });
    setActivePopup(true);
  }, [displayForm, setActivePopup]);

  const popoverCondition = goods && goods?.length !== 0 && !activePopup;

  useEffect(() => {
    if (!useCache && serverGoods) {
      serverGoods.length === 1
        ? handleCreate(serverGoods[0])
        : setActivePopover(serverGoods.length > 0);
    }
  }, [serverGoods, useCache, handleCreate, setActivePopover]);

  const handleCheckboxClick = useCallback((checked: boolean) => {
    checked ? localStorage.setItem('highlight', 'true') : localStorage.setItem('highlight', '');
    setHighlightFunc(() => (checked ? highlightByAccount : undefined));
  }, []);

  if (isLoading) return 'Идет загрузка...';

  if (!inventoryList?.products) return 'Нет данных для отображения';

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
          <Checkbox
            text='Поиск из кеша'
            name='useCache'
            onChange={handleCacheToggle}
            defaultChecked={useCache}
            className={styles.cacheCheckbox}
          />
          <SaveInventoryToXLSX inventoryList={inventoryList} className={styles.xlsx} />
          <Button onClick={createNewProduct}>Добавить товар</Button>
        </div>
        <h1>
          {`Инвентаризация № ${inventoryList.documentNumber} от `}
          {/* <FormatDate date={inventoryList.choosenDate} /> */}
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
